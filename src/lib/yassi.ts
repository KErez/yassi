import { combineLatest, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ElementStatus, StoreElement, yassiStore } from './store';

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

// tslint:disable-next-line:variable-name
const _facadeOwner = {};

export class YassiPropertyDescriptor {
  // The actual name of the property in the store
  name: string;
  // TODO:If true, the property will be writable by any holder and not just by the parent/host component
  fullAccess: boolean;

  constructor(name, fullAccess = false) {
    this.name = name;
    this.fullAccess = fullAccess;
  }
}

export function _yassit(name: string, owner?: any, ownerProp?: string) {
  if (owner && ownerProp) {
    // When the call to yassit was made directly without annotation
    overridePropertyDefinition(owner, ownerProp, new YassiPropertyDescriptor(name));
    return null;
  }

  // TODO: provide property descriptor from strategy class (i.e. allow different type of property storing
  return function(target: any, key: string) {
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
export function overridePropertyDefinition(prototype: any,
                                    key: string,
                                    yassiDescriptor: YassiPropertyDescriptor) {
  yassiStore.ensureUniqueuness(yassiDescriptor.name);
  yassiStore.set(yassiDescriptor.name, new StoreElement(ElementStatus.ACTIVE, prototype));
  /**
   * prototype - The constructor of the class that declared yassit on a property
   * key - the property name that yassit was attached too
   */
  Object.defineProperty(prototype, key, {
    set(firstValue: any) { // First set called on instantiation of the class
      activateElementIfNeeded(yassiDescriptor);
      Object.defineProperty(this, key, {
        // this - the instance of a 'prototype' class
        get() {
          let elem = yassiStore.get(yassiDescriptor.name);
          return elem ? elem.value : undefined;
        },
        set(value: any) { // Here we override the above set
          executeBeforeYassitMiddleware(prototype, key, value);
          let elem = yassiStore.get(yassiDescriptor.name);
          setElementValueHandler(elem, value, prototype, key);
          yassiStore.set(yassiDescriptor.name, elem);
          if (elem.value && !Array.isArray(elem.value)){
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
        if (!target[property] || target.hasOwnProperty(property)) {
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

function activateElementIfNeeded(yassiDescriptor: YassiPropertyDescriptor) {
  const element = yassiStore.get(yassiDescriptor.name);
  if (!element) {
    throw new Error(`Element ${yassiDescriptor.name} does not exist... Odd`);
  }
  if (element.status === ElementStatus.PENDING) {
    element.status = ElementStatus.ACTIVE;
    yassiStore.set(yassiDescriptor.name, element);
  }
}

export function overrideSelectPropertyDefinition(prototype: any,
                                          key: string,
                                          yassiDescriptor: YassiPropertyDescriptor,
                                          obsrv: boolean = false) {
  Object.defineProperty(prototype, key, {
    get() {
      executeBeforeSelectMiddleware(prototype, key);
      // One may observe a property that was not yassit yet. In this case we like to create a pending entry in the store
      let element = yassiStore.getOrCreate(yassiDescriptor.name, ElementStatus.PENDING);
      const result: any = obsrv ? element.observer.asObservable() : element.value;
      executeAfterSelectMiddleware(prototype, key, element ? element.value : null);
      return result;
    }
    // We don't create setter since we want selected properties to behave like readonly properties
  });
}

export function _registerMiddleware(action: string, position: string, fn: (proto, key, val) => void = null) {
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

export function _facade(yassiDescriptor: YassiPropertyDescriptor, sourceElementDescriptors: YassiPropertyDescriptor[],
                        fn: (yassiElementsValue: any[]) => any) {
  if (_facadeOwner[yassiDescriptor.name] === undefined) {
    _facadeOwner[yassiDescriptor.name] = null;
  }
  _yassit(yassiDescriptor.name, _facadeOwner, yassiDescriptor.name);
  const yassiElements$: Array<Observable<any>> = [];
  for (const descriptor of sourceElementDescriptors) {
    yassiElements$.push(yassiStore.getOrCreate(descriptor.name, ElementStatus.PENDING).observer);
  }

  combineLatest(yassiElements$)
    .pipe(
      map(fn),
      catchError((err) => {
        console.log(err);
        return err;
      })
    )
    .subscribe((facadeResults: any) => {
      yassiStore.get(yassiDescriptor.name).observer.next(facadeResults);
    });
}

export function _registerEndpoint(target: any, key: string) {
  const elements: StoreElement[] = yassiStore.findElementsByOwner(target);
  for (const element of elements) {
    if (element && !element.endpoints.has(key)) {
      element.endpoints.set(key, target[key]);
    }
  }
}

export function _communicate(yassiPropName: string, apiFunctionName: string, functionParams: any[]) {
  const element = yassiStore.get(yassiPropName);
  if (!element) {
    console.warn(`Yassi - Cannot call owner of ${yassiPropName}, unknown property`);
    return;
  }
  const fn: unknown = element.endpoints.get(apiFunctionName);
  if (!fn || typeof fn !== 'function') {
    console.warn(`Yassi - ${apiFunctionName} is not a known endpoint of ${yassiPropName} owner object`);
    return;
  }

  // TODO: Can we catch errors of wrong params executions and do something here - what???
  fn.call(element.owner, ...functionParams);
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
