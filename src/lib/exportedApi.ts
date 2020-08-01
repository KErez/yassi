import {
  _facade,
  _registerMiddleware, _yassit,
  overrideSelectPropertyDefinition,
  YassiPropertyDescriptor
} from './yassi';

class Yassi{
  yassit(name: string, owner: object, property: string) {
    return yassit(name, owner, property);
  }

  observe(name: string, owner: object, property: string) {
    return overrideSelectPropertyDefinition(owner, property, new YassiPropertyDescriptor(name), true);
  }

  select(name: string, owner: object, property: string) {
    return overrideSelectPropertyDefinition(owner, property, new YassiPropertyDescriptor(name), false);
  }

  registerMiddleware(action: string, position: string, fn: (proto, key, val) => void = null) {
    return registerMiddleware(action, position, fn);
  }

  facade(name: string, yassiElementsName: string[], fn: (yassiElementsValue: any[]) => any) {
    if (!name || name.length <= 0 || !RegExp('^[A-Za-z_][A-Za-z_$0-9^.].*').test(name) ||
      !yassiElementsName || yassiElementsName.length <= 0) {
      throw new Error('You must provide valid name and yassiElementsName when using facade');
    }
    const elementDescriptors = yassiElementsName.map((n) => new YassiPropertyDescriptor(n));

    _facade(new YassiPropertyDescriptor(name), elementDescriptors, fn);
  }
}
// The default exported object is the support to none annotated solution
const yassi = new Yassi();
export default yassi;

// Function exported from here are annotation solutions
export function yassit(name: string, targetObj?: any, targetProp?: string) {
  // TODO: Add validate name functin that will be used everywhere
  if (!name || name.length <= 0) {
    throw new Error('You must provide property name when using @yassit()');
  }

  return _yassit(name, targetObj, targetProp)
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
  return _registerMiddleware(action, position, fn);
}
