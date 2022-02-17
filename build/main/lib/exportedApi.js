"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMiddleware = exports.endpoint = exports.observe = exports.select = exports.yassit = exports.yassi = void 0;
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
    get(yassiPropName) {
        return yassi_1._get(new yassi_1.YassiPropertyDescriptor(yassiPropName));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0ZWRBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2V4cG9ydGVkQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQU1pQjtBQUVqQjs7O0dBR0c7QUFDSCxNQUFNLEtBQUs7SUFDVDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxhQUFxQixFQUFFLEtBQWEsRUFBRSxRQUFnQjtRQUMzRCxPQUFPLE1BQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxPQUFPLENBQUMsYUFBcUIsRUFBRSxTQUFpQixFQUFFLFVBQWtCO1FBQ2xFLE9BQU8sd0NBQWdDLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLCtCQUF1QixDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25ILENBQUM7SUFFRCxNQUFNLENBQUMsYUFBcUIsRUFBRSxTQUFpQixFQUFFLFVBQWtCO1FBQ2pFLE9BQU8sd0NBQWdDLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLCtCQUF1QixDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BILENBQUM7SUFFRCxHQUFHLENBQUMsYUFBcUI7UUFDdkIsT0FBTyxZQUFJLENBQUMsSUFBSSwrQkFBdUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxLQUFnQyxJQUFJO1FBQ3ZGLE9BQU8sa0JBQWtCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQXFCLEVBQUUsaUJBQTJCLEVBQUUsRUFBc0M7UUFDL0YsS0FBSSxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFF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