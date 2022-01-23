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
        return (0, yassi_1.overrideSelectPropertyDefinition)(targetObj, targetProp, new yassi_1.YassiPropertyDescriptor(yassiPropName), true);
    }
    select(yassiPropName, targetObj, targetProp) {
        return (0, yassi_1.overrideSelectPropertyDefinition)(targetObj, targetProp, new yassi_1.YassiPropertyDescriptor(yassiPropName), false);
    }
    get(yassiPropName) {
        return (0, yassi_1._get)(new yassi_1.YassiPropertyDescriptor(yassiPropName));
    }
    registerMiddleware(action, position, fn = null) {
        return registerMiddleware(action, position, fn);
    }
    facade(yassiPropName, yassiElementsName, fn) {
        for (const name of [yassiPropName].concat(yassiElementsName)) {
            yassi_1.YassiPropertyDescriptor.validateYassiPropertyName(name);
        }
        const elementDescriptors = yassiElementsName.map((n) => new yassi_1.YassiPropertyDescriptor(n));
        (0, yassi_1._facade)(new yassi_1.YassiPropertyDescriptor(yassiPropName), elementDescriptors, fn);
    }
    endpoint(targetInstance, key) {
        const target = targetInstance.constructor.prototype;
        (0, yassi_1._registerEndpoint)(target, key);
    }
    // @ts-ignore
    communicate(yassiPropName, apiFunctionName, functionParams) {
        const error = new Error();
        error.message = 'communicate is deprecated, please use castRequest instead';
        throw error;
    }
    castRequest(yassiPropName, apiFunctionName, ...functionParams) {
        functionParams = functionParams || [];
        (0, yassi_1._communicate)(yassiPropName, apiFunctionName, functionParams);
    }
    republish(yassiPropName) {
        (0, yassi_1._republish)(yassiPropName);
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
    return (0, yassi_1._yassit)(yassiPropName, owner, ownerProp);
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
        (0, yassi_1.overrideSelectPropertyDefinition)(target, key, new yassi_1.YassiPropertyDescriptor(yassiPropName));
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
        (0, yassi_1.overrideSelectPropertyDefinition)(target, key, new yassi_1.YassiPropertyDescriptor(yassiPropName), true);
    };
}
exports.observe = observe;
/**
 * Register the annotated function as an endpoint for the `communicate` operator.
 */
function endpoint() {
    return function (target, key) {
        (0, yassi_1._registerEndpoint)(target, key);
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
    return (0, yassi_1._registerMiddleware)(action, position, fn);
}
exports.registerMiddleware = registerMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0ZWRBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2V4cG9ydGVkQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQU1pQjtBQUVqQjs7O0dBR0c7QUFDSCxNQUFNLEtBQUs7SUFDVDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxhQUFxQixFQUFFLEtBQWEsRUFBRSxRQUFnQjtRQUMzRCxPQUFPLE1BQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxPQUFPLENBQUMsYUFBcUIsRUFBRSxTQUFpQixFQUFFLFVBQWtCO1FBQ2xFLE9BQU8sSUFBQSx3Q0FBZ0MsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksK0JBQXVCLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkgsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFxQixFQUFFLFNBQWlCLEVBQUUsVUFBa0I7UUFDakUsT0FBTyxJQUFBLHdDQUFnQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSwrQkFBdUIsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwSCxDQUFDO0lBRUQsR0FBRyxDQUFDLGFBQXFCO1FBQ3ZCLE9BQU8sSUFBQSxZQUFJLEVBQUMsSUFBSSwrQkFBdUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxLQUFnQyxJQUFJO1FBQ3ZGLE9BQU8sa0JBQWtCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQXFCLEVBQUUsaUJBQTJCLEVBQUUsRUFBc0M7UUFDL0YsS0FBSSxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxp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