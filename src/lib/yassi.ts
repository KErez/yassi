import {BehaviorSubject} from "rxjs";

import {StoreElement, yassiStore} from "./store";


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
  Object.defineProperty(prototype, key, {
    set(firstValue: any) {
      Object.defineProperty(this, key, {
        get() {
          // TODO: remove this getter when you start to store by reference
          let element = yassiStore.get(yassiDescriptor.name);
          return element ? element.value : undefined;
        },
        set(value: any) {
          executeBeforeYassitMiddleware(prototype, key, value);
          if (yassiDescriptor.fullAccess) {
            // TODO: make the property writable from any place and not just from the owner
          }
          let element = yassiStore.get(yassiDescriptor.name) || new StoreElement();
          element.value = value;
          yassiStore.set(yassiDescriptor.name, element);
          if (element.obeserver) {
            element.obeserver.next(element.value);
          }
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

function overrideSelectPropertyDefinition(prototype: any,
                                          key: string,
                                          yassiDescriptor: YassiPropertyDescriptor,
                                          obsrv: boolean = false) {
  Object.defineProperty(prototype, key, {
    get() {
      executeBeforeSelectMiddleware(prototype, key)
      let element = yassiStore.get(yassiDescriptor.name);
      executeAfterSelectMiddleware(prototype, key, element ? element.value : null);
      if (obsrv) {
        element.obeserver = element.obeserver || new BehaviorSubject<any>(element.value);
        return element.obeserver.asObservable();
      } else {
        return element ? element.value : undefined;
      }
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
