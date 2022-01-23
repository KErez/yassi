import {
  _communicate,
  _facade,
  _get,
  _registerEndpoint,
  _registerMiddleware,
  _republish,
  _yassit,
  overrideSelectPropertyDefinition,
  YassiPropertyDescriptor,
} from './yassi';

/**
 * Yassi - Yet Another Simple Store Implementation.
 * This is the main class exported from Yassi library. For further usage please refer to https://github.com/KErez/yassi
 */
class Yassi {
  /**
   * An acronym for yassi it. This is the non annotated version of the yassit operator
   * @param yassiPropName
   * @param owner
   * @param property
   */
  yassit(yassiPropName: string, owner: object, property: string) {
    return yassit(yassiPropName, owner, property);
  }

  observe(yassiPropName: string, targetObj: object, targetProp: string) {
    return overrideSelectPropertyDefinition(targetObj, targetProp, new YassiPropertyDescriptor(yassiPropName), true);
  }

  select(yassiPropName: string, targetObj: object, targetProp: string) {
    return overrideSelectPropertyDefinition(targetObj, targetProp, new YassiPropertyDescriptor(yassiPropName), false);
  }

  get(yassiPropName: string) {
    return _get(new YassiPropertyDescriptor(yassiPropName));
  }

  registerMiddleware(action: string, position: string, fn: (proto, key, val) => void = null) {
    return registerMiddleware(action, position, fn);
  }

  facade(yassiPropName: string, yassiElementsName: string[], fn: (yassiElementsValue: any[]) => any) {
    for (const name of [yassiPropName].concat(yassiElementsName)) {
      YassiPropertyDescriptor.validateYassiPropertyName(name);
    }
    const elementDescriptors = yassiElementsName.map((n) => new YassiPropertyDescriptor(n));

    _facade(new YassiPropertyDescriptor(yassiPropName), elementDescriptors, fn);
  }

  endpoint(targetInstance: any, key: string) {
    const target = targetInstance.constructor.prototype;
    _registerEndpoint(target, key);
  }

  // @ts-ignore
  communicate(yassiPropName: string, apiFunctionName: string, functionParams) {
    const error = new Error();
    error.message = 'communicate is deprecated, please use castRequest instead';
    throw error;
  }

  castRequest(yassiPropName: string, apiFunctionName: string, ...functionParams) {
    functionParams = functionParams || [];
    _communicate(yassiPropName, apiFunctionName, functionParams);
  }

  republish(yassiPropName: string) {
    _republish(yassiPropName);
  }
}

// The actual Yassi instance that exported
export const yassi = new Yassi();

// Function exported from here are annotation solutions
/**
 * An acronym for yassi it. This operator registers an object's property in the store.
 * @param yassiPropName - The id that will use to store it in the store
 * @param owner - The class object that its property was annotated with yassit
 * @param ownerProp - the actual property that was annotated.
 */
export function yassit(yassiPropName: string, owner?: any, ownerProp?: string) {
  YassiPropertyDescriptor.validateYassiPropertyName(yassiPropName);

  return _yassit(yassiPropName, owner, ownerProp);
}

/**
 * Operator to attach the yassi property in the store to the annotated property.
 * Note that the annotated property will be a readonly property and will throw error if you try to change its value directly
 * @param yassiPropName
 */
export function select(yassiPropName) {
  if (!yassiPropName || yassiPropName.length <= 0) {
    throw new Error('Missing key. You must provide name parameter when using @select()');
  }
  return function(target: any, key: string) {
    overrideSelectPropertyDefinition(target, key, new YassiPropertyDescriptor(yassiPropName));
  };
}

/**
 * Similar to select operator but instead of returning the actual value it returns a reactive observable that will fire the value and
 *  every change on it.
 * Note that the annotated property will be a readonly property and will throw error if you try to change its value directly
 * @param yassiPropName
 */
export function observe(yassiPropName) {
  if (!yassiPropName || yassiPropName.length <= 0) {
    throw new Error('Missing key. You must provide name parameter when using @observe()');
  }
  return function(target: any, key: string) {
    overrideSelectPropertyDefinition(target, key, new YassiPropertyDescriptor(yassiPropName), true);
  };
}

/**
 * Register the annotated function as an endpoint for the `communicate` operator.
 */
export function endpoint() {
  return function(target: any, key: string) {
    _registerEndpoint(target, key);
  };
}

/**
 * Register a middleware function that will execute on each event from the actions yassit/select/observe operator
 *  either before or after the change to the store as depict by the position parameter.
 * If a function is not provided, yassi will register the default middleware which print the event to the console.
 * @param action - Either yassit, select or observe
 * @param position - either after or before to define if the function will execute before or after the event etends to thge store
 * @param fn - a function that will execute on each event as described above.
 * If not provided, a default print to console function will executed
 */
export function registerMiddleware(action: string, position: string, fn: (proto, key, val) => void = null) {
  return _registerMiddleware(action, position, fn);
}
