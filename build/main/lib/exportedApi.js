"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yassi_1 = require("./yassi");
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
        return yassi_1.overrideSelectPropertyDefinition(targetObj, targetProp, new yassi_1.YassiPropertyDescriptor(yassiPropName), true);
    }
    select(yassiPropName, targetObj, targetProp) {
        return yassi_1.overrideSelectPropertyDefinition(targetObj, targetProp, new yassi_1.YassiPropertyDescriptor(yassiPropName), false);
    }
    registerMiddleware(action, position, fn = null) {
        return registerMiddleware(action, position, fn);
    }
    facade(yassiPropName, yassiElementsName, fn) {
        for (const name of [yassiPropName].concat(yassiElementsName)) {
            yassi_1.YassiPropertyDescriptor.validateYassiPropertyName(name);
        }
        const elementDescriptors = yassiElementsName.map((n) => new yassi_1.YassiPropertyDescriptor(n));
        yassi_1._facade(new yassi_1.YassiPropertyDescriptor(yassiPropName), elementDescriptors, fn);
    }
    endpoint(targetInstance, key) {
        const target = targetInstance.constructor.prototype;
        yassi_1._registerEndpoint(target, key);
    }
    // @ts-ignore
    communicate(yassiPropName, apiFunctionName, functionParams) {
        const error = new Error();
        error.message = 'communicate is deprecated, please use castRequest instead';
        throw error;
    }
    castRequest(yassiPropName, apiFunctionName, ...functionParams) {
        functionParams = functionParams || [];
        yassi_1._communicate(yassiPropName, apiFunctionName, functionParams);
    }
    republish(yassiPropName) {
        yassi_1._republish(yassiPropName);
    }
}
// The actual Yassi instance that exported
exports.yassi = new Yassi();
// Function exported from here are annotation solutions
/**
 * An acronym for yassi it. This operator registers an object's property in the store.
 * @param yassiPropName - The id that will use to store it in the store
 * @param owner - The class object that its property was annotated with yassit
 * @param ownerProp - the actual property that was annotated.
 */
function yassit(yassiPropName, owner, ownerProp) {
    yassi_1.YassiPropertyDescriptor.validateYassiPropertyName(yassiPropName);
    return yassi_1._yassit(yassiPropName, owner, ownerProp);
}
exports.yassit = yassit;
/**
 * Operator to attach the yassi property in the store to the annotated property.
 * Note that the annotated property will be a readonly property and will throw error if you try to change its value directly
 * @param yassiPropName
 */
function select(yassiPropName) {
    if (!yassiPropName || yassiPropName.length <= 0) {
        throw new Error('Missing key. You must provide name parameter when using @select()');
    }
    return function (target, key) {
        yassi_1.overrideSelectPropertyDefinition(target, key, new yassi_1.YassiPropertyDescriptor(yassiPropName));
    };
}
exports.select = select;
/**
 * Similar to select operator but instead of returning the actual value it returns a reactive observable that will fire the value and
 *  every change on it.
 * Note that the annotated property will be a readonly property and will throw error if you try to change its value directly
 * @param yassiPropName
 */
function observe(yassiPropName) {
    if (!yassiPropName || yassiPropName.length <= 0) {
        throw new Error('Missing key. You must provide name parameter when using @observe()');
    }
    return function (target, key) {
        yassi_1.overrideSelectPropertyDefinition(target, key, new yassi_1.YassiPropertyDescriptor(yassiPropName), true);
    };
}
exports.observe = observe;
/**
 * Register the annotated function as an endpoint for the `communicate` operator.
 */
function endpoint() {
    return function (target, key) {
        yassi_1._registerEndpoint(target, key);
    };
}
exports.endpoint = endpoint;
/**
 * Register a middleware function that will execute on each event from the actions yassit/select/observe operator
 *  either before or after the change to the store as depict by the position parameter.
 * If a function is not provided, yassi will register the default middleware which print the event to the console.
 * @param action - Either yassit, select or observe
 * @param position - either after or before to define if the function will execute before or after the event etends to thge store
 * @param fn - a function that will execute on each event as described above.
 * If not provided, a default print to console function will executed
 */
function registerMiddleware(action, position, fn = null) {
    return yassi_1._registerMiddleware(action, position, fn);
}
exports.registerMiddleware = registerMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0ZWRBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2V4cG9ydGVkQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBTWlCO0FBRWpCOzs7R0FHRztBQUNILE1BQU0sS0FBSztJQUNUOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLGFBQXFCLEVBQUUsS0FBYSxFQUFFLFFBQWdCO1FBQzNELE9BQU8sTUFBTSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELE9BQU8sQ0FBQyxhQUFxQixFQUFFLFNBQWlCLEVBQUUsVUFBa0I7UUFDbEUsT0FBTyx3Q0FBZ0MsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksK0JBQXVCLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkgsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFxQixFQUFFLFNBQWlCLEVBQUUsVUFBa0I7UUFDakUsT0FBTyx3Q0FBZ0MsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksK0JBQXVCLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUVELGtCQUFrQixDQUFDLE1BQWMsRUFBRSxRQUFnQixFQUFFLEtBQWdDLElBQUk7UUFDdkYsT0FBTyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxNQUFNLENBQUMsYUFBcUIsRUFBRSxpQkFBMkIsRUFBRSxFQUFzQztRQUMvRixLQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDM0QsK0JBQXVCLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekQ7UUFDRCxNQUFNLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLEdBQUcs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