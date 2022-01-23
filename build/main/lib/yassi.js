"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._republish = exports._communicate = exports._registerEndpoint = exports._facade = exports._registerMiddleware = exports._get = exports.overrideSelectPropertyDefinition = exports.overridePropertyDefinition = exports._yassit = exports.YassiPropertyDescriptor = void 0;
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
    static validateYassiPropertyName(yassiPropName) {
        if (!yassiPropName || yassiPropName.length <= 0 || !RegExp('^[A-Za-z_][A-Za-z_$0-9^.].*').test(yassiPropName)) {
            throw new Error('You must provide valid yassiPropertyName');
        }
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
    try {
        store_1.yassiStore.ensureUniqueuness(yassiDescriptor.name);
    }
    catch (e) {
        if (e.type === 'duplicate') {
            console.error(`Ignoring: ${e.message}`);
            return;
        }
        throw e;
    }
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
                    if (!Array.isArray(elem.value)) {
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
                return Object.assign({}, value);
            }
        }
    }
    return value;
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
function _get(yassiDescriptor) {
    let element = store_1.yassiStore.get(yassiDescriptor.name);
    return element ? getSafeValue(element.value) : undefined;
}
exports._get = _get;
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
    (0, rxjs_1.combineLatest)(yassiElements$)
        .pipe((0, operators_1.map)(fn), (0, operators_1.filter)((result) => {
        return result != null && !result.breakFacadeChain;
    }), (0, operators_1.map)((result) => {
        // the existence of breakFacadeChain indicates that we need to return the payload only instead of the entire results
        return (result.breakFacadeChain != null) ? result.payload : result;
    }), (0, operators_1.catchError)((err) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3lhc3NpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUFpRDtBQUNqRCw4Q0FBeUQ7QUFFekQsbUNBQWtFO0FBRWxFLE1BQU0sc0JBQXNCLEdBQUcsRUFBRSxDQUFDO0FBQ2xDLE1BQU0scUJBQXFCLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLE1BQU0seUJBQXlCLEdBQUcsRUFBRSxDQUFDO0FBQ3JDLE1BQU0sd0JBQXdCLEdBQUcsRUFBRSxDQUFDO0FBRXBDLFNBQVMseUJBQXlCLENBQUMsU0FBYyxFQUFFLEdBQVcsRUFBRSxLQUFVO0lBQ3hFLElBQUksU0FBUyxFQUFFO1FBQ2IsSUFBSSxTQUFTLENBQUMsV0FBVyxJQUFJLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUU7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdEO0tBQ0Y7QUFDSCxDQUFDO0FBRUQseUNBQXlDO0FBQ3pDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUV4QixNQUFhLHVCQUF1QjtJQVlsQyxZQUFZLElBQUksRUFBRSxVQUFVLEdBQUcsS0FBSztRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBZEQsTUFBTSxDQUFDLHlCQUF5QixDQUFDLGFBQXFCO1FBQ3BELElBQUksQ0FBQyxhQUFhLElBQUksYUFBYSxD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