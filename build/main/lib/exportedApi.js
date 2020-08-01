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
    facade(name, yassiElementsName, fn) {
        if (!name || name.length <= 0 || !RegExp('^[A-Za-z_][A-Za-z_$0-9^.].*').test(name) ||
            !yassiElementsName || yassiElementsName.length <= 0) {
            throw new Error('You must provide valid name and yassiElementsName when using facade');
        }
        const elementDescriptors = yassiElementsName.map((n) => new yassi_1.YassiPropertyDescriptor(n));
        yassi_1._facade(new yassi_1.YassiPropertyDescriptor(name), elementDescriptors, fn);
    }
}
// The default exported object is the support to none annotated solution
const yassi = new Yassi();
exports.default = yassi;
// Function exported from here are annotation solutions
function yassit(name, targetObj, targetProp) {
    // TODO: Add validate name functin that will be used everywhere
    if (!name || name.length <= 0) {
        throw new Error('You must provide property name when using @yassit()');
    }
    return yassi_1._yassit(name, targetObj, targetProp);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0ZWRBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2V4cG9ydGVkQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBS2lCO0FBRWpCLE1BQU0sS0FBSztJQUNULE1BQU0sQ0FBQyxJQUFZLEVBQUUsS0FBYSxFQUFFLFFBQWdCO1FBQ2xELE9BQU8sTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFZLEVBQUUsS0FBYSxFQUFFLFFBQWdCO1FBQ25ELE9BQU8sd0NBQWdDLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLCtCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxRQUFnQjtRQUNsRCxPQUFPLHdDQUFnQyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSwrQkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBRUQsa0JBQWtCLENBQUMsTUFBYyxFQUFFLFFBQWdCLEVBQUUsS0FBZ0MsSUFBSTtRQUN2RixPQUFPLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZLEVBQUUsaUJBQTJCLEVBQUUsRUFBc0M7UUFDdEYsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEYsQ0FBQyxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3JELE1BQU0sSUFBSSxLQUFLLENBQUMscUVBQXFFLENBQUMsQ0FBQztTQUN4RjtRQUNELE1BQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLCtCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEYsZUFBTyxDQUFDLElBQUksK0JBQXVCLENBQUMsSUFBSSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUNGO0FBQ0Qsd0VBQXdFO0FBQ3hFLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7QUFDMUIsa0JBQWUsS0FBSyxDQUFDO0FBRXJCLHVEQUF1RDtBQUN2RCxTQUFnQixNQUFNLENBQUMsSUFBWSxFQUFFLFNBQWUsRUFBRSxVQUFtQjtJQUN2RSwrREFBK0Q7SUFDL0QsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7S0FDeEU7SUFFRCxPQUFPLGVBQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQzdDLENBQUM7QUFQRCx3QkFPQztBQUVELFNBQWdCLE1BQU0sQ0FBQyxJQUFJO0lBQ3pCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO0tBQ3RGO0lBQ0QsT0FBTyxVQUFVLE1BQVcsRUFBRSxHQUFXO1FBQ3ZDLHdDQUFnQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSwrQkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQ2xGLENBQUMsQ0FBQztBQUNKLENBQUM7QUFQRCx3QkFPQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxJQUFJO0lBQzFCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO0tBQ3ZGO0lBQ0QsT0FBTyxVQUFVLE1BQVcsRUFBRSxHQUFXO1FBQ3ZDLHdDQUFnQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSwrQkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN4RixDQUFDLENBQUM7QUFDSixDQUFDO0FBUEQsMEJBT0M7QUFFRCxTQUFnQixrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxLQUFnQyxJQUFJO0lBQ3ZHLE9BQU8sMkJBQW1CLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRkQsZ0RBRUMifQ==