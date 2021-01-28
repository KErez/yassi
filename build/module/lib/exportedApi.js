import { _communicate, _facade, _get, _registerEndpoint, _registerMiddleware, _republish, _yassit, overrideSelectPropertyDefinition, YassiPropertyDescriptor } from './yassi';
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
    get(yassiPropName) {
        return _get(new YassiPropertyDescriptor(yassiPropName));
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
    // @ts-ignore
    communicate(yassiPropName, apiFunctionName, functionParams) {
        const error = new Error();
        error.message = 'communicate is deprecated, please use castRequest instead';
        throw error;
    }
    castRequest(yassiPropName, apiFunctionName, ...functionParams) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0ZWRBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2V4cG9ydGVkQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxZQUFZLEVBQ1osT0FBTyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFDaEMsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFDeEMsZ0NBQWdDLEVBQ2hDLHVCQUF1QixFQUN4QixNQUFNLFNBQVMsQ0FBQztBQUVqQjs7O0dBR0c7QUFDSCxNQUFNLEtBQUs7SUFDVDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxhQUFxQixFQUFFLEtBQWEsRUFBRSxRQUFnQjtRQUMzRCxPQUFPLE1BQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxPQUFPLENBQUMsYUFBcUIsRUFBRSxTQUFpQixFQUFFLFVBQWtCO1FBQ2xFLE9BQU8sZ0NBQWdDLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25ILENBQUM7SUFFRCxNQUFNLENBQUMsYUFBcUIsRUFBRSxTQUFpQixFQUFFLFVBQWtCO1FBQ2pFLE9BQU8sZ0NBQWdDLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BILENBQUM7SUFFRCxHQUFHLENBQUMsYUFBcUI7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxLQUFnQyxJQUFJO1FBQ3ZGLE9BQU8sa0JBQWtCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFD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