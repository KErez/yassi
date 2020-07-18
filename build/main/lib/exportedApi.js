"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yassi_1 = require("./yassi");
class Yassi {
    yassit(name, owner, property) {
        return yassit(name, owner, property);
    }
    observe(name, owner, property) {
        return yassi_1.overrideSelectPropertyDefinition(owner, property, new yassi_1.YassiPropertyDescriptor(name), true);
    }
    select(name, owner, property) {
        return yassi_1.overrideSelectPropertyDefinition(owner, property, new yassi_1.YassiPropertyDescriptor(name), false);
    }
    registerMiddleware(action, position, fn = null) {
        return registerMiddleware(action, position, fn);
    }
}
// The default exported object is the support to none annotated solution
const yassi = new Yassi();
exports.default = yassi;
// Function expoerted from here are annotation solutions
function yassit(name, targetObj, targetProp) {
    if (!name || name.length <= 0) {
        throw new Error('You must provide property name when using @yassit()');
    }
    if (targetObj && targetProp) {
        // When the call to yassit was made directly without annotation
        yassi_1.overridePropertyDefinition(targetObj, targetProp, new yassi_1.YassiPropertyDescriptor(name));
        return null;
    }
    // TODO: provide property descriptor from strategy class (i.e. allow different type of property storing
    return function (target, key) {
        yassi_1.overridePropertyDefinition(target, key, new yassi_1.YassiPropertyDescriptor(name));
    };
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
function registerMiddleware(action, position, fn = null) {
    return yassi_1._registerMiddleware(action, position, fn);
}
exports.registerMiddleware = registerMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0ZWRBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2V4cG9ydGVkQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXFJO0FBRXJJLE1BQU0sS0FBSztJQUNULE1BQU0sQ0FBQyxJQUFZLEVBQUUsS0FBYSxFQUFFLFFBQWdCO1FBQ2xELE9BQU8sTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFZLEVBQUUsS0FBYSxFQUFFLFFBQWdCO1FBQ25ELE9BQU8sd0NBQWdDLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLCtCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxRQUFnQjtRQUNsRCxPQUFPLHdDQUFnQyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSwrQkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBRUQsa0JBQWtCLENBQUMsTUFBYyxFQUFFLFFBQWdCLEVBQUUsS0FBZ0MsSUFBSTtRQUN2RixPQUFPLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUNGO0FBQ0Qsd0VBQXdFO0FBQ3hFLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7QUFDMUIsa0JBQWUsS0FBSyxDQUFDO0FBRXJCLHdEQUF3RDtBQUN4RCxTQUFnQixNQUFNLENBQUMsSUFBWSxFQUFFLFNBQWUsRUFBRSxVQUFtQjtJQUN2RSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztLQUN4RTtJQUVELElBQUksU0FBUyxJQUFJLFVBQVUsRUFBRTtRQUMzQiwrREFBK0Q7UUFDL0Qsa0NBQTBCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLCtCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckYsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELHVHQUF1RztJQUN2RyxPQUFPLFVBQVMsTUFBVyxFQUFFLEdBQVc7UUFDdEMsa0NBQTBCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLCtCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQWZELHdCQWVDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLElBQUk7SUFDekIsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLG1FQUFtRSxDQUFDLENBQUM7S0FDdEY7SUFDRCxPQUFPLFVBQVUsTUFBVyxFQUFFLEdBQVc7UUFDdkMsd0NBQWdDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLCtCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDbEYsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVBELHdCQU9DO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLElBQUk7SUFDMUIsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLG9FQUFvRSxDQUFDLENBQUM7S0FDdkY7SUFDRCxPQUFPLFVBQVUsTUFBVyxFQUFFLEdBQVc7UUFDdkMsd0NBQWdDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLCtCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3hGLENBQUMsQ0FBQztBQUNKLENBQUM7QUFQRCwwQkFPQztBQUVELFNBQWdCLGtCQUFrQixDQUFDLE1BQWMsRUFBRSxRQUFnQixFQUFFLEtBQWdDLElBQUk7SUFDdkcsT0FBTywyQkFBbUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFGRCxnREFFQyJ9