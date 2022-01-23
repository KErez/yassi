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
            // First set called on instantiation of the class
            activateElementIfNeeded(yassiDescriptor);
            Object.defineProperty(this, key, {
                // this - the instance of a 'prototype' class
                get() {
                    const elem = yassiStore.get(yassiDescriptor.name);
                    return elem ? elem.value : undefined;
                },
                set(value) {
                    // Here we override the above set
                    executeBeforeYassitMiddleware(prototype, key, value);
                    const elem = yassiStore.get(yassiDescriptor.name);
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
            },
        });
        // The reference was change so need to fire the event
        // TODO: Do we need a revokeable Proxy and revoke it here???
        element.observer.next(element.value);
    }
    else if (typeof value === 'object') {
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
            },
        });
    }
    else {
        element.value = value;
    }
}
function getSafeValue(value) {
    if (value) {
        if (typeof value === 'object') {
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
            const element = yassiStore.getOrCreate(yassiDescriptor.name, ElementStatus.PENDING);
            const result = obsrv ? element.observer.asObservable() : element.value;
            executeAfterSelectMiddleware(prototype, key, element ? element.value : null);
            return result;
        },
        // We don't create setter since we want selected properties to behave like readonly properties
    });
}
export function _get(yassiDescriptor) {
    const element = yassiStore.get(yassiDescriptor.name);
    return element ? getSafeValue(element.value) : undefined;
}
export function _registerMiddleware(action, position, fn = null) {
    fn = fn || DEFAULT_LOGGER_MIDDLEWARE;
    let arrayToSearch;
    switch (action) {
        case 'yassit':
            arrayToSearch = position === 'after' ? afterYassitMiddleware : beforeYassitMiddleware;
            break;
        case 'observe':
        case 'select':
            arrayToSearch = position === 'after' ? afterSelectingMiddleware : beforeSelectingMiddleware;
            break;
        default:
            return;
    }
    for (const item of arrayToSearch) {
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
        return result.breakFacadeChain != null ? result.payload : result;
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
    for (const item of beforeYassitMiddleware) {
        item(prototype, key, value);
    }
}
// @ts-ignore
function executeAfterYassitMiddleware(prototype, key, value) {
    for (const item of afterYassitMiddleware) {
        item(prototype, key, value);
    }
}
// @ts-ignore
function executeBeforeSelectMiddleware(prototype, key) {
    for (const item of beforeSelectingMiddleware) {
        item(prototype, key);
    }
}
// @ts-ignore
function executeAfterSelectMiddleware(prototype, key, value) {
    for (const item of afterSelectingMiddleware) {
        item(prototype, key, value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3lhc3NpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRWxFLE1BQU0sc0JBQXNCLEdBQUcsRUFBRSxDQUFDO0FBQ2xDLE1BQU0scUJBQXFCLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLE1BQU0seUJBQXlCLEdBQUcsRUFBRSxDQUFDO0FBQ3JDLE1BQU0sd0JBQXdCLEdBQUcsRUFBRSxDQUFDO0FBRXBDLFNBQVMseUJBQXlCLENBQUMsU0FBYyxFQUFFLEdBQVcsRUFBRSxLQUFVO0lBQ3hFLElBQUksU0FBUyxFQUFFO1FBQ2IsSUFBSSxTQUFTLENBQUMsV0FBVyxJQUFJLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUU7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdEO0tBQ0Y7QUFDSCxDQUFDO0FBRUQseUNBQXlDO0FBQ3pDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUV4QixNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxhQUFxQjtRQUNwRCxJQUFJLENBQUMsYUFBYSxJ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