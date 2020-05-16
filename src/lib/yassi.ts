import {BehaviorSubject} from "rxjs";

import {ElementStatus, StoreElement, yassiStore} from "./store";


const beforeYassitMiddleware = [];
const afterYassitMiddleware = [];
const beforeSelectingMiddleware = [];
const afterSelectingMiddleware = [];

function DEFAULT_LOGGER_MIDDLEWARE(prototype: any, key: string, value: any) {
  if (prototype) {
    if (prototype.constructor && prototype.constructor.name) {
      console.log(`${prototype.constructor.name}.${key}=${JSON.stringify(value)}`);
    } else {
      console.log(`${prototype}.${key}=${JSON.stringify(value)}`);
    }
  }
}

class YassiPropertyDescriptor {
  // The actual name of the property in the store
  name: string;
  // TODO:If true, the property will be writable by any holder and not just by the parent/host component
  fullAccess: boolean;

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
function overridePropertyDefinition(prototype: any,
                                    key: string,
                                    yassiDescriptor: YassiPropertyDescriptor) {
  if (yassiStore.has(yassiDescriptor.name)) {
    throw new Error(`Store already has entry with name ${yassiDescriptor.name}`)
  }
  yassiStore.ensureUniqueuness(yassiDescriptor.name);

  /**
   * prototype - The constructor of the class that declared yassit on a property
   * key - the property name that yassit was attached too
   */
  Object.defineProperty(prototype, key, {
    set(firstValue: any) { // This set called on first instantiation of the class
      Object.defineProperty(this, key, {
        // this - the instance of a 'prototype' class
        get() {
          let elem = yassiStore.get(yassiDescriptor.name);
          return elem ? elem.value : undefined;
        },
        set(value: any) { // Here we override the above set
          executeBeforeYassitMiddleware(prototype, key, value);
          let elem = yassiStore.get(yassiDescriptor.name) || new StoreElement();
          setElementValueHandler(elem, value, prototype, key);
          yassiStore.set(yassiDescriptor.name, elem);
          if (elem.value && !Array.isArray(elem.value)){
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

function setElementValueHandler(element: StoreElement, value: any, prototype: any, key: string) {
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
        if (!Number.isInteger(parseInt(property as string, 10))) {
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
  } else if (typeof (value) === 'object') {
    element.value = new Proxy(value, {
      // @ts-ignore
      deleteProperty(target, property) {
        return true;
      },
      // @ts-ignore
      set(target, property, val, receiver) {
        if (target.hasOwnProperty(property)) {
          executeBeforeYassitMiddleware(prototype, key, value);
          target[property] = val;
          element.observer.next(element.value);
          executeAfterYassitMiddleware(prototype, key, element.value);
        } else {
          target[property] = val;
        }
        return true;
      }
    })
  } else {
    element.value = value;
  }
}

function overrideSelectPropertyDefinition(prototype: any,
                                          key: string,
                                          yassiDescriptor: YassiPropertyDescriptor,
                                          obsrv: boolean = false) {
  Object.defineProperty(prototype, key, {
    get() {
      let result: any;
      executeBeforeSelectMiddleware(prototype, key);
      let element = yassiStore.get(yassiDescriptor.name);
      if (obsrv) {
        let elem = element || new StoreElement(ElementStatus.PENDING);
        elem.observer = elem.observer || new BehaviorSubject<any>(elem.value);
        if(!element) {
          // A client may observe a key that was not set yet.
          yassiStore.set(yassiDescriptor.name, elem);
        }
        result = elem.observer.asObservable();
      } else {
        result = element ? element.value : undefined;
      }
      executeAfterSelectMiddleware(prototype, key, element ? element.value : null);
      return result;
    }
    // We don't create setter since we want selected properties to behave like readonly properties
  });
}

export function yassit(name: string) {
  if (!name || name.length <= 0) {
    throw new Error('You must provide property name when using @yassit()');
  }
  // TODO: provide property descriptor from strategy class (i.e. allow different type of property storing
  return function (target: any, key: string) {
    overridePropertyDefinition(target, key, new YassiPropertyDescriptor(name));
  };
}

export function select(name) {
  if (!name || name.length <= 0) {
    throw new Error('Missing key. You must provide name parameter when using @select()');
  }
  return function (target: any, key: string) {
    overrideSelectPropertyDefinition(target, key, new YassiPropertyDescriptor(name))
  };
}

export function observe(name) {
  if (!name || name.length <= 0) {
    throw new Error('Missing key. You must provide name parameter when using @observe()');
  }
  return function (target: any, key: string) {
    overrideSelectPropertyDefinition(target, key, new YassiPropertyDescriptor(name), true)
  };
}

export function registerMiddleware(action: string, position: string, fn: (proto, key, val) => void = null) {
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

// @ts-ignore
function executeBeforeYassitMiddleware(prototype: any, key: string, value: any) {
  for (let item of beforeYassitMiddleware) {
    item(prototype, key, value);
  }
}

// @ts-ignore
function executeAfterYassitMiddleware(prototype: any, key: string, value: any) {
  for (let item of afterYassitMiddleware) {
    item(prototype, key, value);
  }
}

// @ts-ignore
function executeBeforeSelectMiddleware(prototype: any, key: string) {
  for (let item of beforeSelectingMiddleware) {
    item(prototype, key);
  }
}

// @ts-ignore
function executeAfterSelectMiddleware(prototype: any, key: string, value: any) {
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
