import {BehaviorSubject} from "rxjs";

class StoreElement {
  value: any;
  obeserver?: any; // TODO: replace to observer from rxJS or yours???
}

const store = new Map<string, StoreElement>();

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
  // TODO: if yassiDescriptor.name is not valid or is already in store throw exception with possible reason i.e:
  //  'Property of such name already exists in the store. Maybe you should declare it on a shared component or service
  Object.defineProperty(prototype, key, {
    set(firstValue: any) {
      Object.defineProperty(this, key, {
        get() {
          // TODO: remove this getter when you start to store by reference
          let element = store.get(yassiDescriptor.name);
          return element ? element.value : undefined;
        },
        set(value: any) {
          if (yassiDescriptor.fullAccess) {
            // TODO: make the property writable from any place and not just from the owner
          }
          let element = store.get(yassiDescriptor.name) || new StoreElement();
          element.value = value;
          store.set(yassiDescriptor.name, element);
          if(element.obeserver) {
            element.obeserver.next(element.value);
          }
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
      let element = store.get(yassiDescriptor.name);
      if(obsrv) {
        element.obeserver = element.obeserver || new BehaviorSubject<any>(element.value);
        return element.obeserver;
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
  if (!name) {
    throw new Error('Missing key. You must provide name parameter when using @select()');
  }
  return function (target: any, key: string) {
    overrideSelectPropertyDefinition(target, key, new YassiPropertyDescriptor(name))
  };
}

export function observe(name) {
  if (!name) {
    throw new Error('Missing key. You must provide name parameter when using @observe()');
  }
  return function (target: any, key: string) {
    overrideSelectPropertyDefinition(target, key, new YassiPropertyDescriptor(name), true)
  };
}
