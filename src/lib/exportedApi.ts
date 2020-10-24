import {
  _communicate,
  _facade, _registerEndpoint,
  _registerMiddleware, _republish, _yassit,
  overrideSelectPropertyDefinition,
  YassiPropertyDescriptor
} from './yassi';

class Yassi{
  yassit(yassiPropName: string, owner: object, property: string) {
    return yassit(yassiPropName, owner, property);
  }

  observe(yassiPropName: string, targetObj: object, targetProp: string) {
    return overrideSelectPropertyDefinition(targetObj, targetProp, new YassiPropertyDescriptor(yassiPropName), true);
  }

  select(yassiPropName: string, targetObj: object, targetProp: string) {
    return overrideSelectPropertyDefinition(targetObj, targetProp, new YassiPropertyDescriptor(yassiPropName), false);
  }

  registerMiddleware(action: string, position: string, fn: (proto, key, val) => void = null) {
    return registerMiddleware(action, position, fn);
  }

  facade(yassiPropName: string, yassiElementsName: string[], fn: (yassiElementsValue: any[]) => any) {
    for(const name of [yassiPropName].concat(yassiElementsName)) {
      YassiPropertyDescriptor.validateYassiPropertyName(name);
    }
    const elementDescriptors = yassiElementsName.map((n) => new YassiPropertyDescriptor(n));

    _facade(new YassiPropertyDescriptor(yassiPropName), elementDescriptors, fn);
  }

  endpoint(targetInstance: any, key: string) {
    const target = targetInstance.constructor.prototype;
    _registerEndpoint(target, key);
  }

  communicate(yassiPropName: string, apiFunctionName: string, functionParams: any[] = []) {
    _communicate(yassiPropName, apiFunctionName, functionParams);
  }

  republish(yassiPropName: string) {
    _republish(yassiPropName);
  }
}
export const yassi = new Yassi();

// Function exported from here are annotation solutions
export function yassit(yassiPropName: string, owner?: any, ownerProp?: string) {
  YassiPropertyDescriptor.validateYassiPropertyName(yassiPropName);

  return _yassit(yassiPropName, owner, ownerProp)
}

export function select(yassiPropName) {
  if (!yassiPropName || yassiPropName.length <= 0) {
    throw new Error('Missing key. You must provide name parameter when using @select()');
  }
  return function (target: any, key: string) {
    overrideSelectPropertyDefinition(target, key, new YassiPropertyDescriptor(yassiPropName))
  };
}

export function observe(yassiPropName) {
  if (!yassiPropName || yassiPropName.length <= 0) {
    throw new Error('Missing key. You must provide name parameter when using @observe()');
  }
  return function (target: any, key: string) {
    overrideSelectPropertyDefinition(target, key, new YassiPropertyDescriptor(yassiPropName), true)
  };
}

export function endpoint() {
  return function (target: any, key: string) {
    _registerEndpoint(target, key);
  }
}

export function registerMiddleware(action: string, position: string, fn: (proto, key, val) => void = null) {
  return _registerMiddleware(action, position, fn);
}
