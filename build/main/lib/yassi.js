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
    static validateYassiPropertyName(yassiPropName) {
        if (!yassiPropName || yassiPropName.length <= 0 || !RegExp('^[A-Za-z_][A-Za-z_$0-9^.].*').test(yassiPropName)) {
            throw new Error('You must provide valid yassiPropertyName');
        }
    }
    constructor(name, fullAccess = false) {
        this.name = name;
        this.fullAccess = fullAccess;
    }
}
exports.YassiPropertyDescriptor = YassiPropertyDescriptor;
function _yassit(name, owner, ownerProp) {
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
    store_1.yassiStore.set(yassiDescriptor.name, new store_1.StoreElement(store_1.ElementStatus.ACTIVE, prototype));
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
            const element = store_1.yassiStore.get(yassiDescriptor.name);
            element.setOwner(this);
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
                    // Array properties that are not the items such as length
                    target[property] = val;
                    return true;
                }
                executeBeforeYassitMiddleware(prototype, key, element.value);
                target[property] = val;
                element.observer.next([...element.value]);
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
                    element.observer.next(Object.assign({}, element.value));
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
        .pipe(operators_1.map(fn), operators_1.filter((result) => {
        return result != null && !result.breakFacadeChain;
    }), operators_1.map((result) => {
        // the existence of breakFacadeChain indicates that we need to return the payload only instead of the entire results
        return (result.breakFacadeChain != null) ? result.payload : result;
    }), operators_1.catchError((err) => {
        console.log(err);
        return err;
    }))
        .subscribe((facadeResults) => {
        store_1.yassiStore.get(yassiDescriptor.name).observer.next(facadeResults);
    });
}
exports._facade = _facade;
function _registerEndpoint(target, key) {
    const elements = store_1.yassiStore.findElementsByOwner(target);
    for (const element of elements) {
        if (element && !element.endpoints.has(key)) {
            element.endpoints.set(key, target[key]);
        }
    }
}
exports._registerEndpoint = _registerEndpoint;
function _communicate(yassiPropName, apiFunctionName, functionParams) {
    const element = store_1.yassiStore.get(yassiPropName);
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
exports._communicate = _communicate;
function _republish(yassiPropName) {
    const element = store_1.yassiStore.get(yassiPropName);
    if (!element) {
        console.warn(`Yassi - Cannot call owner of ${yassiPropName}, unknown property`);
        return;
    }
    element.observer.next(element.value);
}
exports._republish = _republish;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3lhc3NpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQWlEO0FBQ2pELDhDQUF5RDtBQUV6RCxtQ0FBa0U7QUFFbEUsTUFBTSxzQkFBc0IsR0FBRyxFQUFFLENBQUM7QUFDbEMsTUFBTSxxQkFBcUIsR0FBRyxFQUFFLENBQUM7QUFDakMsTUFBTSx5QkFBeUIsR0FBRyxFQUFFLENBQUM7QUFDckMsTUFBTSx3QkFBd0IsR0FBRyxFQUFFLENBQUM7QUFFcEMsU0FBUyx5QkFBeUIsQ0FBQyxTQUFjLEVBQUUsR0FBVyxFQUFFLEtBQVU7SUFDeEUsSUFBSSxTQUFTLEVBQUU7UUFDYixJQUFJLFNBQVMsQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5RTthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDN0Q7S0FDRjtBQUNILENBQUM7QUFFRCx5Q0FBeUM7QUFDekMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBRXhCLE1BQWEsdUJBQXVCO0lBQ2xDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxhQUFxQjtRQUNwRCxJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFHO1lBQzlHLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMs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