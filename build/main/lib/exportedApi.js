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
    communicate(yassiPropName, apiFunctionName, functionParams = []) {
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