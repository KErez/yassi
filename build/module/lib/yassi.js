import { combineLatest } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { ElementStatus, StoreElement, yassiStore } from './store';
const beforeYassitMiddleware = [];
const afterYassitMiddleware = [];
const beforeSelectingMiddleware = [];
const afterSelectingMiddleware = [];
function DEFAULT_LOGGER_MIDDLEWARE(prototype, key, value) {
    if (prototype) {
        if (prototype.constructor && prototype.constructor.name) {
            console.log(`${prototype.constructor.name}.${key}=${JSON.stringify(value)}`);
        }
        else {
            console.log(`${prototype}.${key}=${JSON.stringify(value)}`);
        }
    }
}
// tslint:disable-next-line:variable-name
const _facadeOwner = {};
export class YassiPropertyDescriptor {
    static validateYassiPropertyName(yassiPropName) {
        if (!yassiPropName || yassiPropName.length <= 0 || !RegExp('^[A-Za-z_][A-Za-z_$0-9^.].*').test(yassiPropName)) {
            throw new Error('You must provide valid yassiPropertyName');
        }
    }
    // The actual name of the property in the store
    name;
    // TODO:If true, the property will be writable by any holder and not just by the parent/host component
    fullAccess;
    constructor(name, fullAccess = false) {
        this.name = name;
        this.fullAccess = fullAccess;
    }
}
export function _yassit(name, owner, ownerProp) {
    if (owner && ownerProp) {
        // When the call to yassit was made directly without annotation
        overridePropertyDefinition(owner, ownerProp, new YassiPropertyDescriptor(name));
        return null;
    }
    // TODO: provide property descriptor from strategy class (i.e. allow different type of property storing
    return function (target, key) {
        overridePropertyDefinition(target, key, new YassiPropertyDescriptor(name));
    };
}
/**
 * To make sure the property definition is on the instance and not on the class you need to define the property
 *  to override itself with another property definition.
 *  This way when the class is loaded the property definition is called and set a new setter definition
 *  Now each time an instance is called the setter is called and set a new setter and getter definition
 * Thanks to Romke Van Der Meulen - https://romkevandermeulen.nl/2018/01/24/typescript-property-decorators.html
 */
export function overridePropertyDefinition(prototype, key, yassiDescriptor) {
    try {
        yassiStore.ensureUniqueuness(yassiDescriptor.name);
    }
    catch (e) {
        if (e.type === 'duplicate') {
            console.error(`Ignoring: ${e.message}`);
            return;
        }
        throw e;
    }
    yassiStore.set(yassiDescriptor.name, new StoreElement(ElementStatus.ACTIVE, prototype));
    /**
     * prototype - The constructor of the class that declared yassit on a property
     * key - the property name that yassit was attached too
     */
    Object.defineProperty(prototype, key, {
        set(firstValue) {
            activateElementIfNeeded(yassiDescriptor);
            Object.defineProperty(this, key, {
                // this - the instance of a 'prototype' class
                get() {
                    let elem = yassiStore.get(yassiDescriptor.name);
                    return elem ? elem.value : undefined;
                },
                set(value) {
                    executeBeforeYassitMiddleware(prototype, key, value);
                    let elem = yassiStore.get(yassiDescriptor.name);
                    setElementValueHandler(elem, value, prototype, key);
                    yassiStore.set(yassiDescriptor.name, elem);
                    if (!Array.isArray(elem.value)) {
                        elem.observer.next(elem.value);
                    }
                    executeAfterYassitMiddleware(prototype, key, elem.value);
                },
                enumerable: true,
            });
            const element = yassiStore.get(yassiDescriptor.name);
            element.setOwner(this);
            this[key] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
}
function setElementValueHandler(element, value, prototype, key) {
    if (Array.isArray(value)) {
        // a proxy for our array
        element.value = new Proxy(value, {
            // apply(target: any, thisArg, argumentList?: any) {
            //   executeBeforeYassitMiddleware(prototype, key, value);
            //   const result = thisArg[target].apply(this, argumentList);
            //   element.observer.next(element.value);
            //   executeAfterYassitMiddleware(prototype, key, element.value);
            //   return result;
            // },
            // @ts-ignore
            deleteProperty(target, property) {
                return true;
            },
            // @ts-ignore
            set(target, property, val, receiver) {
                if (!Number.isInteger(parseInt(property, 10))) {
                    // Array properties that are not the items such as length
                    target[property] = val;
                    return true;
                }
                executeBeforeYassitMiddleware(prototype, key, element.value);
                target[property] = val;
                element.observer.next(getSafeValue(element.value));
                executeAfterYassitMiddleware(prototype, key, element.value);
                return true;
            }
        });
        // The reference was change so need to fire the event
        // TODO: Do we need a revokeable Proxy and revoke it here???
        element.observer.next(element.value);
    }
    else if (typeof (value) === 'object') {
        element.value = new Proxy(value, {
            // @ts-ignore
            deleteProperty(target, property) {
                return true;
            },
            // @ts-ignore
            set(target, property, val, receiver) {
                if (!target[property] || target.hasOwnProperty(property)) {
                    executeBeforeYassitMiddleware(prototype, key, value);
                    target[property] = val;
                    element.observer.next(getSafeValue(element.value));
                    executeAfterYassitMiddleware(prototype, key, element.value);
                }
                else {
                    target[property] = val;
                }
                return true;
            }
        });
    }
    else {
        element.value = value;
    }
}
function getSafeValue(value) {
    if (value) {
        if (typeof (value) === 'object') {
            // TODO: Change this implementation with exceptional Proxy
            if (Array.isArray(value)) {
                return [...value];
            }
            else {
                return { ...value };
            }
        }
    }
    return value;
}
function activateElementIfNeeded(yassiDescriptor) {
    const element = yassiStore.get(yassiDescriptor.name);
    if (!element) {
        throw new Error(`Element ${yassiDescriptor.name} does not exist... Odd`);
    }
    if (element.status === ElementStatus.PENDING) {
        element.status = ElementStatus.ACTIVE;
        yassiStore.set(yassiDescriptor.name, element);
    }
}
export function overrideSelectPropertyDefinition(prototype, key, yassiDescriptor, obsrv = false) {
    Object.defineProperty(prototype, key, {
        get() {
            executeBeforeSelectMiddleware(prototype, key);
            // One may observe a property that was not yassit yet. In this case we like to create a pending entry in the store
            let element = yassiStore.getOrCreate(yassiDescriptor.name, ElementStatus.PENDING);
            const result = obsrv ? element.observer.asObservable() : element.value;
            executeAfterSelectMiddleware(prototype, key, element ? element.value : null);
            return result;
        }
        // We don't create setter since we want selected properties to behave like readonly properties
    });
}
export function _get(yassiDescriptor) {
    let element = yassiStore.get(yassiDescriptor.name);
    return element ? getSafeValue(element.value) : undefined;
}
export function _registerMiddleware(action, position, fn = null) {
    fn = fn || DEFAULT_LOGGER_MIDDLEWARE;
    let arrayToSearch;
    switch (action) {
        case 'yassit':
            arrayToSearch = (position === 'after') ? afterYassitMiddleware : beforeYassitMiddleware;
            break;
        case 'observe':
        case 'select':
            arrayToSearch = (position === 'after') ? afterSelectingMiddleware : beforeSelectingMiddleware;
            break;
        default:
            return;
    }
    for (let item of arrayToSearch) {
        // prevent duplication
        if (item === fn) {
            return;
        }
    }
    arrayToSearch.push(fn);
}
export function _facade(yassiDescriptor, sourceElementDescriptors, fn) {
    if (_facadeOwner[yassiDescriptor.name] === undefined) {
        _facadeOwner[yassiDescriptor.name] = null;
    }
    _yassit(yassiDescriptor.name, _facadeOwner, yassiDescriptor.name);
    const yassiElements$ = [];
    for (const descriptor of sourceElementDescriptors) {
        yassiElements$.push(yassiStore.getOrCreate(descriptor.name, ElementStatus.PENDING).observer);
    }
    combineLatest(yassiElements$)
        .pipe(map(fn), filter((result) => {
        return result != null && !result.breakFacadeChain;
    }), map((result) => {
        // the existence of breakFacadeChain indicates that we need to return the payload only instead of the entire results
        return (result.breakFacadeChain != null) ? result.payload : result;
    }), catchError((err) => {
        console.log(err);
        return err;
    }))
        .subscribe((facadeResults) => {
        yassiStore.get(yassiDescriptor.name).observer.next(facadeResults);
    });
}
export function _registerEndpoint(target, key) {
    const elements = yassiStore.findElementsByOwner(target);
    for (const element of elements) {
        if (element && !element.endpoints.has(key)) {
            element.endpoints.set(key, target[key]);
        }
    }
}
export function _communicate(yassiPropName, apiFunctionName, functionParams) {
    const element = yassiStore.get(yassiPropName);
    if (!element) {
        console.warn(`Yassi - Cannot call owner of ${yassiPropName}, unknown property`);
        return;
    }
    const fn = element.endpoints.get(apiFunctionName);
    if (!fn || typeof fn !== 'function') {
        console.warn(`Yassi - ${apiFunctionName} is not a known endpoint of ${yassiPropName} owner object`);
        return;
    }
    // TODO: Can we catch errors of wrong params executions and do something here - what???
    fn.call(element.owner, ...functionParams);
}
export function _republish(yassiPropName) {
    const element = yassiStore.get(yassiPropName);
    if (!element) {
        console.warn(`Yassi - Cannot call owner of ${yassiPropName}, unknown property`);
        return;
    }
    element.observer.next(element.value);
}
// @ts-ignore
function executeBeforeYassitMiddleware(prototype, key, value) {
    for (let item of beforeYassitMiddleware) {
        item(prototype, key, value);
    }
}
// @ts-ignore
function executeAfterYassitMiddleware(prototype, key, value) {
    for (let item of afterYassitMiddleware) {
        item(prototype, key, value);
    }
}
// @ts-ignore
function executeBeforeSelectMiddleware(prototype, key) {
    for (let item of beforeSelectingMiddleware) {
        item(prototype, key);
    }
}
// @ts-ignore
function executeAfterSelectMiddleware(prototype, key, value) {
    for (let item of afterSelectingMiddleware) {
        item(prototype, key, value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3lhc3NpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRWxFLE1BQU0sc0JBQXNCLEdBQUcsRUFBRSxDQUFDO0FBQ2xDLE1BQU0scUJBQXFCLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLE1BQU0seUJBQXlCLEdBQUcsRUFBRSxDQUFDO0FBQ3JDLE1BQU0sd0JBQXdCLEdBQUcsRUFBRSxDQUFDO0FBRXBDLFNBQVMseUJBQXlCLENBQUMsU0FBYyxFQUFFLEdBQVcsRUFBRSxLQUFVO0lBQ3hFLElBQUksU0FBUyxFQUFFO1FBQ2IsSUFBSSxTQUFTLENBQUMsV0FBVyxJQUFJLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUU7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdEO0tBQ0Y7QUFDSCxDQUFDO0FBRUQseUNBQXlDO0FBQ3pDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUV4QixNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxhQUFxQjtRQUNwRCxJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFHO1lBQzlHLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsSUFBSSxDQUFTO0lBQ2Isc0dBQXNHO0lBQ3RHLFVBQVUsQ0FBVTtJQUVwQixZQUFZLElBQUksRUFBRSxVQUFVLEdBQUcsS0FBSztRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLFVBQVUsT0FBTyxDQUFDLElBQVksRUFBRSxLQUFXLEVBQUUsU0FBa0I7SUFDbkUsSUFBSSxLQUFLLElBQUksU0FBUyxFQUFFO1FBQ3RCLCtEQUErRDtRQUMvRCwwQkFBMEIsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoRixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsdUdBQXVHO0lBQ3ZHLE9BQU8sVUFBUyxNQUFXLEVBQUUsR0FBVztRQUN0QywwQkFBMEIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDLENBQUM7QUFFSixDQUFDO0FBR0Q7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLDBCQUEwQixDQUFDLFNBQWMsRUFDckIsR0FBVyxFQUNYLGVBQXdDO0lBQzFFLElBQUk7UUFDRixVQUFVLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BEO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN4QyxPQUFPO1NBQ1I7UUFDRCxNQUFNLENBQUMsQ0FBQztLQUNUO0lBQ0QsVUFBVSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN4Rjs7O09BR0c7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDcEMsR0FBRyxDQUFDLFVBQWU7WUFDakIsdUJBQXVCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUMvQiw2Q0FBNkM7Z0JBQzdDLEdBQUc7b0JBQ0QsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBQ0QsR0FBRyxDQUFDLEtBQVU7b0JBQ1osNkJBQTZCLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDckQsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hELHNCQUFzQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNwRCxVQUFVLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQzt3QkFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNoQztvQkFDRCw0QkFBNEIsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0QsQ0FBQztnQkFDRCxVQUFVLEVBQUUsSUFBSTthQUNqQixDQUFDLENBQUM7WUFDSCxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDekIsQ0FBQztRQUNELFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFlBQVksRUFBRSxJQUFJO0tBQ25CLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLHNCQUFzQixDQUFDLE9BQXFCLEVBQUUsS0FBVSxFQUFFLFNBQWMsRUFBRSxHQUFXO0lBQzVGLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4Qix3QkFBd0I7UUFDeEIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDL0Isb0RBQW9EO1lBQ3BELDBEQUEwRDtZQUMxRCw4REFBOEQ7WUFDOUQsMENBQTBDO1lBQzFDLGlFQUFpRTtZQUNqRSxtQkFBbUI7WUFDbkIsS0FBSztZQUNMLGFBQWE7WUFDYixjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVE7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELGFBQWE7WUFDYixHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUTtnQkFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtvQkFDdkQseURBQXlEO29CQUN6RCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO29CQUN2QixPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCw2QkFBNkIsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDN0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDdkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCw0QkFBNEIsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUQsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gscURBQXFEO1FBQ3JELDREQUE0RDtRQUM1RCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEM7U0FBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDdEMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDL0IsYUFBYTtZQUNiLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUTtnQkFDN0IsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBQ0QsYUFBYTtZQUNiLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRO2dCQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3hELDZCQUE2QixDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3JELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7b0JBQ3ZCLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDbkQsNEJBQTRCLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzdEO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7aUJBQ3hCO2dCQUNELE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztTQUNGLENBQUMsQ0FBQTtLQUNIO1NBQU07UUFDTCxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUN2QjtBQUNILENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxLQUFVO0lBQzlCLElBQUksS0FBSyxFQUFFO1FBQ1QsSUFBSSxPQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQzlCLDBEQUEwRDtZQUMxRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO2FBQ25CO2lCQUFNO2dCQUNMLE9BQU8sRUFBQyxHQUFHLEtBQUssRUFBQyxDQUFDO2FBQ25CO1NBQ0Y7S0FDRjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsdUJBQXVCLENBQUMsZUFBd0M7SUFDdkUsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxlQUFlLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxDQUFDO0tBQzFFO0lBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLGFBQWEsQ0FBQyxPQUFPLEVBQUU7UUFDNUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3RDLFVBQVUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztLQUMvQztBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsZ0NBQWdDLENBQUMsU0FBYyxFQUNyQixHQUFXLEVBQ1gsZUFBd0MsRUFDeEMsUUFBaUIsS0FBSztJQUM5RCxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7UUFDcEMsR0FBRztZQUNELDZCQUE2QixDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM5QyxrSEFBa0g7WUFDbEgsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsRixNQUFNLE1BQU0sR0FBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDNUUsNEJBQTRCLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdFLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFDRCw4RkFBOEY7S0FDL0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELE1BQU0sVUFBVSxJQUFJLENBQUMsZUFBd0M7SUFDM0QsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUMzRCxDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLE1BQWMsRUFBRSxRQUFnQixFQUFFLEtBQWdDLElBQUk7SUFDeEcsRUFBRSxHQUFHLEVBQUUsSUFBSSx5QkFBeUIsQ0FBQztJQUNyQyxJQUFJLGFBQWEsQ0FBQztJQUNsQixRQUFRLE1BQU0sRUFBRTtRQUNkLEtBQUssUUFBUTtZQUNYLGFBQWEsR0FBRyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDO1lBQ3hGLE1BQU07UUFDUixLQUFLLFNBQVMsQ0FBQztRQUNmLEtBQUssUUFBUTtZQUNYLGFBQWEsR0FBRyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDO1lBQzlGLE1BQU07UUFDUjtZQUNFLE9BQU87S0FDVjtJQUVELEtBQUssSUFBSSxJQUFJLElBQUksYUFBYSxFQUFFO1FBQzlCLHNCQUFzQjtRQUN0QixJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDZixPQUFPO1NBQ1I7S0FDRjtJQUNELGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUMsZUFBd0MsRUFBRSx3QkFBbUQsRUFDN0YsRUFBc0M7SUFDNUQsSUFBSSxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUNwRCxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztLQUMzQztJQUNELE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEUsTUFBTSxjQUFjLEdBQTJCLEVBQUUsQ0FBQztJQUNsRCxLQUFLLE1BQU0sVUFBVSxJQUFJLHdCQUF3QixFQUFFO1FBQ2pELGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM5RjtJQUVELGFBQWEsQ0FBQyxjQUFjLENBQUM7U0FDMUIsSUFBSSxDQUNILEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFDUCxNQUFNLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtRQUNyQixPQUFPLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7SUFDcEQsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7UUFDbEIsb0hBQW9IO1FBQ3BILE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNwRSxDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQ0g7U0FDQSxTQUFTLENBQUMsQ0FBQyxhQUFrQixFQUFFLEVBQUU7UUFDaEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsTUFBVyxFQUFFLEdBQVc7SUFDeEQsTUFBTSxRQUFRLEdBQW1CLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4RSxLQUFLLE1BQU0sT0FBTyxJQUFJLFFBQVEsRUFBRTtRQUM5QixJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN6QztLQUNGO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsYUFBcUIsRUFBRSxlQUF1QixFQUFFLGNBQXFCO0lBQ2hHLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLGFBQWEsb0JBQW9CLENBQUMsQ0FBQztRQUNoRixPQUFPO0tBQ1I7SUFDRCxNQUFNLEVBQUUsR0FBWSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMzRCxJQUFJLENBQUMsRUFBRSxJQUFJLE9BQU8sRUFBRSxLQUFLLFVBQVUsRUFBRTtRQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsZUFBZSwrQkFBK0IsYUFBYSxlQUFlLENBQUMsQ0FBQztRQUNwRyxPQUFPO0tBQ1I7SUFFRCx1RkFBdUY7SUFDdkYsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsYUFBcUI7SUFDOUMsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsYUFBYSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2hGLE9BQU87S0FDUjtJQUNELE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRUQsYUFBYTtBQUNiLFNBQVMsNkJBQTZCLENBQUMsU0FBYyxFQUFFLEdBQVcsRUFBRSxLQUFVO0lBQzVFLEtBQUssSUFBSSxJQUFJLElBQUksc0JBQXNCLEVBQUU7UUFDdkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDN0I7QUFDSCxDQUFDO0FBRUQsYUFBYTtBQUNiLFNBQVMsNEJBQTRCLENBQUMsU0FBYyxFQUFFLEdBQVcsRUFBRSxLQUFVO0lBQzNFLEtBQUssSUFBSSxJQUFJLElBQUkscUJBQXFCLEVBQUU7UUFDdEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDN0I7QUFDSCxDQUFDO0FBRUQsYUFBYTtBQUNiLFNBQVMsNkJBQTZCLENBQUMsU0FBYyxFQUFFLEdBQVc7SUFDaEUsS0FBSyxJQUFJLElBQUksSUFBSSx5QkFBeUIsRUFBRTtRQUMxQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQztBQUVELGFBQWE7QUFDYixTQUFTLDRCQUE0QixDQUFDLFNBQWMsRUFBRSxHQUFXLEVBQUUsS0FBVTtJQUMzRSxLQUFLLElBQUksSUFBSSxJQUFJLHdCQUF3QixFQUFFO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzdCO0FBQ0gsQ0FBQyJ9