import { _communicate, _facade, _registerEndpoint, _registerMiddleware, _yassit, overrideSelectPropertyDefinition, YassiPropertyDescriptor } from './yassi';
class Yassi {
    yassit(name, owner, property) {
        return yassit(name, owner, property);
    }
    observe(name, targetObj, targetProp) {
        return overrideSelectPropertyDefinition(targetObj, targetProp, new YassiPropertyDescriptor(name), true);
    }
    select(name, targetObj, targetProp) {
        return overrideSelectPropertyDefinition(targetObj, targetProp, new YassiPropertyDescriptor(name), false);
    }
    registerMiddleware(action, position, fn = null) {
        return registerMiddleware(action, position, fn);
    }
    facade(name, yassiElementsName, fn) {
        if (!name || name.length <= 0 || !RegExp('^[A-Za-z_][A-Za-z_$0-9^.].*').test(name) ||
            !yassiElementsName || yassiElementsName.length <= 0) {
            throw new Error('You must provide valid name and yassiElementsName when using facade');
        }
        const elementDescriptors = yassiElementsName.map((n) => new YassiPropertyDescriptor(n));
        _facade(new YassiPropertyDescriptor(name), elementDescriptors, fn);
    }
    endpoint(targetInstance, key) {
        const target = targetInstance.constructor.prototype;
        _registerEndpoint(target, key);
    }
    communicate(yassiPropName, apiFunctionName, functionParams = []) {
        _communicate(yassiPropName, apiFunctionName, functionParams);
    }
}
export const yassi = new Yassi();
// Function exported from here are annotation solutions
export function yassit(name, owner, ownerProp) {
    // TODO: Add validate name functin that will be used everywhere
    if (!name || name.length <= 0) {
        throw new Error('You must provide property name when using @yassit()');
    }
    return _yassit(name, owner, ownerProp);
}
export function select(name) {
    if (!name || name.length <= 0) {
        throw new Error('Missing key. You must provide name parameter when using @select()');
    }
    return function (target, key) {
        overrideSelectPropertyDefinition(target, key, new YassiPropertyDescriptor(name));
    };
}
export function observe(name) {
    if (!name || name.length <= 0) {
        throw new Error('Missing key. You must provide name parameter when using @observe()');
    }
    return function (target, key) {
        overrideSelectPropertyDefinition(target, key, new YassiPropertyDescriptor(name), true);
    };
}
export function endpoint() {
    return function (target, key) {
        _registerEndpoint(target, key);
    };
}
export function registerMiddleware(action, position, fn = null) {
    return _registerMiddleware(action, position, fn);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0ZWRBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2V4cG9ydGVkQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxZQUFZLEVBQ1osT0FBTyxFQUFFLGlCQUFpQixFQUMxQixtQkFBbUIsRUFBRSxPQUFPLEVBQzVCLGdDQUFnQyxFQUNoQyx1QkFBdUIsRUFDeEIsTUFBTSxTQUFTLENBQUM7QUFFakIsTUFBTSxLQUFLO0lBQ1QsTUFBTSxDQUFDLElBQVksRUFBRSxLQUFhLEVBQUUsUUFBZ0I7UUFDbEQsT0FBTyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVksRUFBRSxTQUFpQixFQUFFLFVBQWtCO1FBQ3pELE9BQU8sZ0NBQWdDLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLHVCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBWSxFQUFFLFNBQWlCLEVBQUUsVUFBa0I7UUFDeEQsT0FBTyxnQ0FBZ0MsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0csQ0FBQztJQUVELGtCQUFrQixDQUFDLE1BQWMsRUFBRSxRQUFnQixFQUFFLEtBQWdDLElBQUk7UUFDdkYsT0FBTyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxNQUFNLENBQUMsSUFBWSxFQUFFLGlCQUEyQixFQUFFLEVBQXNDO1FBQ3RGLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxJQUFJLENB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