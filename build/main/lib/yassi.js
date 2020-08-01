"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const store_1 = require("./store");
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
class YassiPropertyDescriptor {
    constructor(name, fullAccess = false) {
        this.name = name;
        this.fullAccess = fullAccess;
    }
}
exports.YassiPropertyDescriptor = YassiPropertyDescriptor;
function _yassit(name, targetObj, targetProp) {
    if (targetObj && targetProp) {
        // When the call to yassit was made directly without annotation
        overridePropertyDefinition(targetObj, targetProp, new YassiPropertyDescriptor(name));
        return null;
    }
    // TODO: provide property descriptor from strategy class (i.e. allow different type of property storing
    return function (target, key) {
        overridePropertyDefinition(target, key, new YassiPropertyDescriptor(name));
    };
}
exports._yassit = _yassit;
/**
 * To make sure the property definition is on the instance and not on the class you need to define the property
 *  to override itself with another property definition.
 *  This way when the class is loaded the property definition is called and set a new setter definition
 *  Now each time an instance is called the setter is called and set a new setter and getter definition
 * Thanks to Romke Van Der Meulen - https://romkevandermeulen.nl/2018/01/24/typescript-property-decorators.html
 */
function overridePropertyDefinition(prototype, key, yassiDescriptor) {
    store_1.yassiStore.ensureUniqueuness(yassiDescriptor.name);
    store_1.yassiStore.set(yassiDescriptor.name, new store_1.StoreElement(store_1.ElementStatus.ACTIVE));
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
                    let elem = store_1.yassiStore.get(yassiDescriptor.name);
                    return elem ? elem.value : undefined;
                },
                set(value) {
                    executeBeforeYassitMiddleware(prototype, key, value);
                    let elem = store_1.yassiStore.get(yassiDescriptor.name);
                    setElementValueHandler(elem, value, prototype, key);
                    store_1.yassiStore.set(yassiDescriptor.name, elem);
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
exports.overridePropertyDefinition = overridePropertyDefinition;
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
    const element = store_1.yassiStore.get(yassiDescriptor.name);
    if (!element) {
        throw new Error(`Element ${yassiDescriptor.name} does not exist... Odd`);
    }
    if (element.status === store_1.ElementStatus.PENDING) {
        element.status = store_1.ElementStatus.ACTIVE;
        store_1.yassiStore.set(yassiDescriptor.name, element);
    }
}
function overrideSelectPropertyDefinition(prototype, key, yassiDescriptor, obsrv = false) {
    Object.defineProperty(prototype, key, {
        get() {
            executeBeforeSelectMiddleware(prototype, key);
            // One may observe a property that was not yassit yet. In this case we like to create a pending entry in the store
            let element = store_1.yassiStore.getOrCreate(yassiDescriptor.name, store_1.ElementStatus.PENDING);
            const result = obsrv ? element.observer.asObservable() : element.value;
            executeAfterSelectMiddleware(prototype, key, element ? element.value : null);
            return result;
        }
        // We don't create setter since we want selected properties to behave like readonly properties
    });
}
exports.overrideSelectPropertyDefinition = overrideSelectPropertyDefinition;
function _registerMiddleware(action, position, fn = null) {
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
exports._registerMiddleware = _registerMiddleware;
function _facade(yassiDescriptor, sourceElementDescriptors, fn) {
    if (_facadeOwner[yassiDescriptor.name] === undefined) {
        _facadeOwner[yassiDescriptor.name] = null;
    }
    _yassit(yassiDescriptor.name, _facadeOwner, yassiDescriptor.name);
    const yassiElements$ = [];
    for (const descriptor of sourceElementDescriptors) {
        yassiElements$.push(store_1.yassiStore.getOrCreate(descriptor.name, store_1.ElementStatus.PENDING).observer);
    }
    rxjs_1.combineLatest(yassiElements$)
        .pipe(operators_1.map(fn), operators_1.catchError((err) => {
        console.log(err);
        return err;
    }))
        .subscribe((facadeResults) => {
        store_1.yassiStore.get(yassiDescriptor.name).observer.next(facadeResults);
    });
}
exports._facade = _facade;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3lhc3NpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQWlEO0FBQ2pELDhDQUFpRDtBQUVqRCxtQ0FBa0U7QUFHbEUsTUFBTSxzQkFBc0IsR0FBRyxFQUFFLENBQUM7QUFDbEMsTUFBTSxxQkFBcUIsR0FBRyxFQUFFLENBQUM7QUFDakMsTUFBTSx5QkFBeUIsR0FBRyxFQUFFLENBQUM7QUFDckMsTUFBTSx3QkFBd0IsR0FBRyxFQUFFLENBQUM7QUFFcEMsU0FBUyx5QkFBeUIsQ0FBQyxTQUFjLEVBQUUsR0FBVyxFQUFFLEtBQVU7SUFDeEUsSUFBSSxTQUFTLEVBQUU7UUFDYixJQUFJLFNBQVMsQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5RTthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDN0Q7S0FDRjtBQUNILENBQUM7QUFFRCx5Q0FBeUM7QUFDekMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBRXhCLE1BQWEsdUJBQXVCO0lBTWxDLFlBQVksSUFBSSxFQUFFLFVBQVUsR0FBRyxLQUFLO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7Q0FDRjtBQVZELDBEQVVDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLElBQVksRUFBRSxTQUFlLEVBQUUsVUFBbUI7SUFD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