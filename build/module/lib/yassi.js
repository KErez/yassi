import { combineLatest } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    yassiStore.ensureUniqueuness(yassiDescriptor.name);
    yassiStore.set(yassiDescriptor.name, new StoreElement(ElementStatus.ACTIVE));
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
                    if (elem.value && !Array.isArray(elem.value)) {
                        elem.observer.next(elem.value);
                    }
                    executeAfterYassitMiddleware(prototype, key, elem.value);
                },
                enumerable: true,
            });
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
                    target[property] = val;
                    return true;
                }
                executeBeforeYassitMiddleware(prototype, key, element.value);
                target[property] = val;
                element.observer.next(element.value);
                executeAfterYassitMiddleware(prototype, key, element.value);
                return true;
            }
        });
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
                    element.observer.next(element.value);
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
        .pipe(map(fn), catchError((err) => {
        console.log(err);
        return err;
    }))
        .subscribe((facadeResults) => {
        yassiStore.get(yassiDescriptor.name).observer.next(facadeResults);
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3lhc3NpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFHbEUsTUFBTSxzQkFBc0IsR0FBRyxFQUFFLENBQUM7QUFDbEMsTUFBTSxxQkFBcUIsR0FBRyxFQUFFLENBQUM7QUFDakMsTUFBTSx5QkFBeUIsR0FBRyxFQUFFLENBQUM7QUFDckMsTUFBTSx3QkFBd0IsR0FBRyxFQUFFLENBQUM7QUFFcEMsU0FBUyx5QkFBeUIsQ0FBQyxTQUFjLEVBQUUsR0FBVyxFQUFFLEtBQVU7SUFDeEUsSUFBSSxTQUFTLEVBQUU7UUFDYixJQUFJLFNBQVMsQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5RTthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDN0Q7S0FDRjtBQUNILENBQUM7QUFFRCx5Q0FBeUM7QUFDekMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBRXhCLE1BQU0sT0FBTyx1QkFBdUI7SUFNbEMsWUFBWSxJQUFJLEVBQUUsVUFBVSxHQUFHLEtBQUs7UUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJ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