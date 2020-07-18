import { _registerMiddleware, overridePropertyDefinition, overrideSelectPropertyDefinition, YassiPropertyDescriptor } from './yassi';

export function yassit(name: string, targetObj?: any, targetProp?: any) {
  if (!name || name.length <= 0) {
    throw new Error('You must provide property name when using @yassit()');
  }

  if (targetObj && targetProp) {
    // When the call to yassit was made directly without annotation
    overridePropertyDefinition(targetObj, targetProp, new YassiPropertyDescriptor(name));
    return null;
  }

  // TODO: provide property descriptor from strategy class (i.e. allow different type of property storing
  return function(target: any, key: string) {
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
  return _registerMiddleware(action, position, fn);
}
