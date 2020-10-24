"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yassi_1 = require("./yassi");
class Yassi {
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
exports.yassi = new Yassi();
// Function exported from here are annotation solutions
function yassit(yassiPropName, owner, ownerProp) {
    yassi_1.YassiPropertyDescriptor.validateYassiPropertyName(yassiPropName);
    return yassi_1._yassit(yassiPropName, owner, ownerProp);
}
exports.yassit = yassit;
function select(yassiPropName) {
    if (!yassiPropName || yassiPropName.length <= 0) {
        throw new Error('Missing key. You must provide name parameter when using @select()');
    }
    return function (target, key) {
        yassi_1.overrideSelectPropertyDefinition(target, key, new yassi_1.YassiPropertyDescriptor(yassiPropName));
    };
}
exports.select = select;
function observe(yassiPropName) {
    if (!yassiPropName || yassiPropName.length <= 0) {
        throw new Error('Missing key. You must provide name parameter when using @observe()');
    }
    return function (target, key) {
        yassi_1.overrideSelectPropertyDefinition(target, key, new yassi_1.YassiPropertyDescriptor(yassiPropName), true);
    };
}
exports.observe = observe;
function endpoint() {
    return function (target, key) {
        yassi_1._registerEndpoint(target, key);
    };
}
exports.endpoint = endpoint;
function registerMiddleware(action, position, fn = null) {
    return yassi_1._registerMiddleware(action, position, fn);
}
exports.registerMiddleware = registerMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0ZWRBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2V4cG9ydGVkQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBTWlCO0FBRWpCLE1BQU0sS0FBSztJQUNULE1BQU0sQ0FBQyxhQUFxQixFQUFFLEtBQWEsRUFBRSxRQUFnQjtRQUMzRCxPQUFPLE1BQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxPQUFPLENBQUMsYUFBcUIsRUFBRSxTQUFpQixFQUFFLFVBQWtCO1FBQ2xFLE9BQU8sd0NBQWdDLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLCtCQUF1QixDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25ILENBQUM7SUFFRCxNQUFNLENBQUMsYUFBcUIsRUFBRSxTQUFpQixFQUFFLFVBQWtCO1FBQ2pFLE9BQU8sd0NBQWdDLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLCtCQUF1QixDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3BILENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxLQUFnQyxJQUFJO1FBQ3ZGLE9BQU8sa0JBQWtCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQXFCLEVBQUUsaUJBQTJCLEVBQUUsRUFBc0M7UUFDL0YsS0FBSSxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQzNELCtCQUF1QixDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsTUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksK0JBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4RixlQUFPLENBQUMsSUFBSSwrQkFBdUIsQ0FBQyxhQUFhLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsUUFBUSxDQUFDLGNBQW1CLEVBQUUsR0FBVztRQUN2QyxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUNwRCx5QkFBaUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFdBQVcsQ0FBQyxhQUFxQixFQUFFLGVBQXVCLEVBQUUsaUJBQXdCLEVBQUU7UUFDcEYsb0JBQVksQ0FBQyxhQUFhLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxTQUFTLENBQUMsYUFBcUI7UUFDN0Isa0JBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFDWSxRQUFBLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBRWpDLHVEQUF1RDtBQUN2RCxTQUFnQixNQUFNLENBQUMsYUFBcUIsRUFBRSxLQUFXLEVBQUUsU0FBa0I7SUFDM0UsK0JBQXVCLENBQUMseUJBQXlCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFakUsT0FBTyxlQUFPLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUNqRCxDQUFDO0FBSkQsd0JBSUM7QUFFRCxTQUFnQixNQUFNLENBQUMsYUFBYTtJQUNsQyxJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQy9DLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQztLQUN0RjtJQUNELE9BQU8sVUFBVSxNQUFXLEVBQUUsR0FBVztRQUN2Qyx3Q0FBZ0MsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksK0JBQXVCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQTtJQUMzRixDQUFDLENBQUM7QUFDSixDQUFDO0FBUEQsd0JBT0M7QUFFRCxTQUFnQixPQUFPLENBQUMsYUFBYTtJQUNuQyxJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQy9DLE1BQU0sSUFBSSxLQUFLLENBQUMsb0VBQW9FLENBQUMsQ0FBQztLQUN2RjtJQUNELE9BQU8sVUFBVSxNQUFXLEVBQUUsR0FBVztRQUN2Qyx3Q0FBZ0MsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksK0JBQXVCLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDakcsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVBELDBCQU9DO0FBRUQsU0FBZ0IsUUFBUTtJQUN0QixPQUFPLFVBQVUsTUFBVyxFQUFFLEdBQVc7UUFDdkMseUJBQWlCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQTtBQUNILENBQUM7QUFKRCw0QkFJQztBQUVELFNBQWdCLGtCQUFrQixDQUFDLE1BQWMsRUFBRSxRQUFnQixFQUFFLEtBQWdDLElBQUk7SUFDdkcsT0FBTywyQkFBbUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFGRCxnREFFQyJ9