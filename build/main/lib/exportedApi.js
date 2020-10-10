"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yassi_1 = require("./yassi");
class Yassi {
    yassit(name, owner, property) {
        return yassit(name, owner, property);
    }
    observe(name, targetObj, targetProp) {
        return yassi_1.overrideSelectPropertyDefinition(targetObj, targetProp, new yassi_1.YassiPropertyDescriptor(name), true);
    }
    select(name, targetObj, targetProp) {
        return yassi_1.overrideSelectPropertyDefinition(targetObj, targetProp, new yassi_1.YassiPropertyDescriptor(name), false);
    }
    registerMiddleware(action, position, fn = null) {
        return registerMiddleware(action, position, fn);
    }
    facade(name, yassiElementsName, fn) {
        if (!name || name.length <= 0 || !RegExp('^[A-Za-z_][A-Za-z_$0-9^.].*').test(name) ||
            !yassiElementsName || yassiElementsName.length <= 0) {
            throw new Error('You must provide valid name and yassiElementsName when using facade');
        }
        const elementDescriptors = yassiElementsName.map((n) => new yassi_1.YassiPropertyDescriptor(n));
        yassi_1._facade(new yassi_1.YassiPropertyDescriptor(name), elementDescriptors, fn);
    }
    endpoint(targetInstance, key) {
        const target = targetInstance.constructor.prototype;
        yassi_1._registerEndpoint(target, key);
    }
    communicate(yassiPropName, apiFunctionName, functionParams = []) {
        yassi_1._communicate(yassiPropName, apiFunctionName, functionParams);
    }
}
exports.yassi = new Yassi();
// Function exported from here are annotation solutions
function yassit(name, owner, ownerProp) {
    // TODO: Add validate name functin that will be used everywhere
    if (!name || name.length <= 0) {
        throw new Error('You must provide property name when using @yassit()');
    }
    return yassi_1._yassit(name, owner, ownerProp);
}
exports.yassit = yassit;
function select(name) {
    if (!name || name.length <= 0) {
        throw new Error('Missing key. You must provide name parameter when using @select()');
    }
    return function (target, key) {
        yassi_1.overrideSelectPropertyDefinition(target, key, new yassi_1.YassiPropertyDescriptor(name));
    };
}
exports.select = select;
function observe(name) {
    if (!name || name.length <= 0) {
        throw new Error('Missing key. You must provide name parameter when using @observe()');
    }
    return function (target, key) {
        yassi_1.overrideSelectPropertyDefinition(target, key, new yassi_1.YassiPropertyDescriptor(name), true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0ZWRBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2V4cG9ydGVkQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBTWlCO0FBRWpCLE1BQU0sS0FBSztJQUNULE1BQU0sQ0FBQyxJQUFZLEVBQUUsS0FBYSxFQUFFLFFBQWdCO1FBQ2xELE9BQU8sTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBRSxVQUFrQjtRQUN6RCxPQUFPLHdDQUFnQyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSwrQkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVksRUFBRSxTQUFpQixFQUFFLFVBQWtCO1FBQ3hELE9BQU8sd0NBQWdDLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLCtCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxLQUFnQyxJQUFJO1FBQ3ZGLE9BQU8sa0JBQWtCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVksRUFBRSxpQkFBMkIsRUFBRSxFQUFzQztRQUN0RixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRixDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDckQsTUFBTSxJQUFJLEtBQUssQ0FBQyxxRUFBcUUsQ0FBQyxDQUFDO1NBQ3hGO1FBQ0QsTUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksK0JBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4RixlQUFPLENBQUMsSUFBSSwrQkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsUUFBUSxDQUFDLGNBQW1CLEVBQUUsR0FBVztRQUN2QyxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUNwRCx5QkFBaUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFdBQVcsQ0FBQyxhQUFxQixFQUFFLGVBQXVCLEVBQUUsaUJBQXdCLEVBQUU7UUFDcEYsb0JBQVksQ0FBQyxhQUFhLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDRjtBQUNZLFFBQUEsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7QUFFakMsdURBQXVEO0FBQ3ZELFNBQWdCLE1BQU0sQ0FBQyxJQUFZLEVBQUUsS0FBVyxFQUFFLFNBQWtCO0lBQ2xFLCtEQUErRDtJQUMvRCxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztLQUN4RTtJQUVELE9BQU8sZUFBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDeEMsQ0FBQztBQVBELHdCQU9DO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLElBQUk7SUFDekIsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLG1FQUFtRSxDQUFDLENBQUM7S0FDdEY7SUFDRCxPQUFPLFVBQVUsTUFBVyxFQUFFLEdBQVc7UUFDdkMsd0NBQWdDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLCtCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDbEYsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVBELHdCQU9DO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLElBQUk7SUFDMUIsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLG9FQUFvRSxDQUFDLENBQUM7S0FDdkY7SUFDRCxPQUFPLFVBQVUsTUFBVyxFQUFFLEdBQVc7UUFDdkMsd0NBQWdDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLCtCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3hGLENBQUMsQ0FBQztBQUNKLENBQUM7QUFQRCwwQkFPQztBQUVELFNBQWdCLFFBQVE7SUFDdEIsT0FBTyxVQUFVLE1BQVcsRUFBRSxHQUFXO1FBQ3ZDLHlCQUFpQixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUE7QUFDSCxDQUFDO0FBSkQsNEJBSUM7QUFFRCxTQUFnQixrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxLQUFnQyxJQUFJO0lBQ3ZHLE9BQU8sMkJBQW1CLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRkQsZ0RBRUMifQ==