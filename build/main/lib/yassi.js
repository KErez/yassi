"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
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
class YassiPropertyDescriptor {
    constructor(name, fullAccess = false) {
        this.name = name;
        this.fullAccess = fullAccess;
    }
}
/**
 * To make sure the property definition is on the instance and not on the class you need to define the property
 *  to override itself with another property definition.
 *  This way when the class is loaded the property definition is called and set a new setter definition
 *  Now each time an instance is called the setter is called and set a new setter and getter definition
 * Thanks to Romke Van Der Meulen - https://romkevandermeulen.nl/2018/01/24/typescript-property-decorators.html
 */
function overridePropertyDefinition(prototype, key, yassiDescriptor) {
    if (store_1.yassiStore.has(yassiDescriptor.name)) {
        throw new Error(`Store already has entry with name ${yassiDescriptor.name}`);
    }
    store_1.yassiStore.ensureUniqueuness(yassiDescriptor.name);
    Object.defineProperty(prototype, key, {
        set(firstValue) {
            Object.defineProperty(this, key, {
                get() {
                    let element = store_1.yassiStore.get(yassiDescriptor.name);
                    return element ? element.value : undefined;
                },
                set(value) {
                    executeBeforeYassitMiddleware(prototype, key, value);
                    if (yassiDescriptor.fullAccess) {
                        // TODO: make the property writable from any place and not just from the owner
                    }
                    let element = store_1.yassiStore.get(yassiDescriptor.name) || new store_1.StoreElement();
                    element.status = store_1.ElementStatus.ACTIVE;
                    element.value = value;
                    store_1.yassiStore.set(yassiDescriptor.name, element);
                    element.observer.next(element.value);
                    executeAfterYassitMiddleware(prototype, key, element.value);
                },
                enumerable: true,
            });
            this[key] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
}
function overrideSelectPropertyDefinition(prototype, key, yassiDescriptor, obsrv = false) {
    Object.defineProperty(prototype, key, {
        get() {
            executeBeforeSelectMiddleware(prototype, key);
            let element = store_1.yassiStore.get(yassiDescriptor.name);
            executeAfterSelectMiddleware(prototype, key, element ? element.value : null);
            if (obsrv) {
                let elem = element || new store_1.StoreElement(store_1.ElementStatus.PENDING);
                elem.observer = elem.observer || new rxjs_1.BehaviorSubject(elem.value);
                if (!element) {
                    // A client may observe a key that was not set yet.
                    store_1.yassiStore.set(yassiDescriptor.name, elem);
                }
                return elem.observer.asObservable();
            }
            else {
                return element ? element.value : undefined;
            }
        }
        // We don't create setter since we want selected properties to behave like readonly properties
    });
}
function yassit(name) {
    if (!name || name.length <= 0) {
        throw new Error('You must provide property name when using @yassit()');
    }
    // TODO: provide property descriptor from strategy class (i.e. allow different type of property storing
    return function (target, key) {
        overridePropertyDefinition(target, key, new YassiPropertyDescriptor(name));
    };
}
exports.yassit = yassit;
function select(name) {
    if (!name || name.length <= 0) {
        throw new Error('Missing key. You must provide name parameter when using @select()');
    }
    return function (target, key) {
        overrideSelectPropertyDefinition(target, key, new YassiPropertyDescriptor(name));
    };
}
exports.select = select;
function observe(name) {
    if (!name || name.length <= 0) {
        throw new Error('Missing key. You must provide name parameter when using @observe()');
    }
    return function (target, key) {
        overrideSelectPropertyDefinition(target, key, new YassiPropertyDescriptor(name), true);
    };
}
exports.observe = observe;
function registerMiddleware(action, position, fn = null) {
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
exports.registerMiddleware = registerMiddleware;
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
/*
Why not recursively overridePropertyDefinition when it is an object/array??!
You should create a benchmark between such solutions where the object size
  (vertically) and depth grows incrementally
Benchmark both creation time of objects and then access and change time in
  conjunction with yassiTouch/yassiUpdate/yassiAssign

The benefit is it works is that it will make yassiTouch/yassiUpdate/yassiAssign
  obsolete and the user can use the core js functionality
 */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3lhc3NpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQXFDO0FBRXJDLG1DQUFnRTtBQUdoRSxNQUFNLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztBQUNsQyxNQUFNLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztBQUNqQyxNQUFNLHlCQUF5QixHQUFHLEVBQUUsQ0FBQztBQUNyQyxNQUFNLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztBQUVwQyxTQUFTLHlCQUF5QixDQUFDLFNBQWMsRUFBRSxHQUFXLEVBQUUsS0FBVTtJQUN4RSxJQUFJLFNBQVMsRUFBRTtRQUNiLElBQUksU0FBUyxDQUFDLFdBQVcsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtZQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzlFO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM3RDtLQUNGO0FBQ0gsQ0FBQztBQUVELE1BQU0sdUJBQXVCO0lBTTNCLFlBQVksSUFBSSxFQUFFLFVBQVUsR0FBRyxLQUFLO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7Q0FDRjtBQUVEOzs7Ozs7R0FNRztBQUNILFNBQVMsMEJBQTBCLENBQUMsU0FBYyxFQUNkLEdBQVcsRUFDWCxlQUF3QztJQUMxRSxJQUFJLGtCQUFVLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFB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