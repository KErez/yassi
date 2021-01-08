import { _communicate, _facade, _registerEndpoint, _registerMiddleware, _republish, _yassit, overrideSelectPropertyDefinition, YassiPropertyDescriptor } from './yassi';
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
    yassit(yassiPropName, owner, property) {
        return yassit(yassiPropName, owner, property);
    }
    observe(yassiPropName, targetObj, targetProp) {
        return overrideSelectPropertyDefinition(targetObj, targetProp, new YassiPropertyDescriptor(yassiPropName), true);
    }
    select(yassiPropName, targetObj, targetProp) {
        return overrideSelectPropertyDefinition(targetObj, targetProp, new YassiPropertyDescriptor(yassiPropName), false);
    }
    registerMiddleware(action, position, fn = null) {
        return registerMiddleware(action, position, fn);
    }
    facade(yassiPropName, yassiElementsName, fn) {
        for (const name of [yassiPropName].concat(yassiElementsName)) {
            YassiPropertyDescriptor.validateYassiPropertyName(name);
        }
        const elementDescriptors = yassiElementsName.map((n) => new YassiPropertyDescriptor(n));
        _facade(new YassiPropertyDescriptor(yassiPropName), elementDescriptors, fn);
    }
    endpoint(targetInstance, key) {
        const target = targetInstance.constructor.prototype;
        _registerEndpoint(target, key);
    }
    communicate(yassiPropName, apiFunctionName, ...functionParams) {
        functionParams = functionParams || [];
        _communicate(yassiPropName, apiFunctionName, functionParams);
    }
    republish(yassiPropName) {
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
export function yassit(yassiPropName, owner, ownerProp) {
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
    return function (target, key) {
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
    return function (target, key) {
        overrideSelectPropertyDefinition(target, key, new YassiPropertyDescriptor(yassiPropName), true);
    };
}
/**
 * Register the annotated function as an endpoint for the `communicate` operator.
 */
export function endpoint() {
    return function (target, key) {
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
export function registerMiddleware(action, position, fn = null) {
    return _registerMiddleware(action, position, fn);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0ZWRBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2V4cG9ydGVkQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxZQUFZLEVBQ1osT0FBTyxFQUFFLGlCQUFpQixFQUMxQixtQkFBbUIsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUN4QyxnQ0FBZ0MsRUFDaEMsdUJBQXVCLEVBQ3hCLE1BQU0sU0FBUyxDQUFDO0FBRWpCOzs7R0FHRztBQUNILE1BQU0sS0FBSztJQUNUOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLGFBQXFCLEVBQUUsS0FBYSxFQUFFLFFBQWdCO1FBQzNELE9BQU8sTUFBTSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELE9BQU8sQ0FBQyxhQUFxQixFQUFFLFNBQWlCLEVBQUUsVUFBa0I7UUFDbEUsT0FBTyxnQ0FBZ0MsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksdUJBQXVCLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkgsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFxQixFQUFFLFNBQWlCLEVBQUUsVUFBa0I7UUFDakUsT0FBTyxnQ0FBZ0MsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksdUJBQXVCLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUVELGtCQUFrQixDQUFDLE1BQWMsRUFBRSxRQUFnQixFQUFFLEtBQWdDLElBQUk7UUFDdkYsT0FBTyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxNQUFNLENBQUMsYUFBcUIsRUFBRSxpQkFBMkIsRUFBRSxFQUFzQztRQUMvRixLQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFD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