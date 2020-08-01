import { _facade, _registerMiddleware, _yassit, overrideSelectPropertyDefinition, YassiPropertyDescriptor } from './yassi';
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
}
// The default exported object is the support to none annotated solution
const yassi = new Yassi();
export default yassi;
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
export function registerMiddleware(action, position, fn = null) {
    return _registerMiddleware(action, position, fn);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0ZWRBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2V4cG9ydGVkQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxPQUFPLEVBQ1AsbUJBQW1CLEVBQUUsT0FBTyxFQUM1QixnQ0FBZ0MsRUFDaEMsdUJBQXVCLEVBQ3hCLE1BQU0sU0FBUyxDQUFDO0FBRWpCLE1BQU0sS0FBSztJQUNULE1BQU0sQ0FBQyxJQUFZLEVBQUUsS0FBYSxFQUFFLFFBQWdCO1FBQ2xELE9BQU8sTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBRSxVQUFrQjtRQUN6RCxPQUFPLGdDQUFnQyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVksRUFBRSxTQUFpQixFQUFFLFVBQWtCO1FBQ3hELE9BQU8sZ0NBQWdDLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLHVCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxLQUFnQyxJQUFJO1FBQ3ZGLE9BQU8sa0JBQWtCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVksRUFBRSxpQkFBMkIsRUFBRSxFQUFzQztRQUN0RixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoRixDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDckQsTUFBTSxJQUFJLEtBQUssQ0FBQyxxRUFBcUUsQ0FBQyxDQUFDO1NBQ3hGO1FBQ0QsTUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4RixPQUFPLENBQUMsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQ0Y7QUFDRCx3RUFBd0U7QUFDeEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUMxQixlQUFlLEtBQUssQ0FBQztBQUVyQix1REFBdUQ7QUFDdkQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxJQUFZLEVBQUUsS0FBVyxFQUFFLFNBQWtCO0lBQ2xFLCtEQUErRDtJQUMvRCxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztLQUN4RTtJQUVELE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDeEMsQ0FBQztBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsSUFBSTtJQUN6QixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQztLQUN0RjtJQUNELE9BQU8sVUFBVSxNQUFXLEVBQUUsR0FBVztRQUN2QyxnQ0FBZ0MsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUNsRixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLE9BQU8sQ0FBQyxJQUFJO0lBQzFCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO0tBQ3ZGO0lBQ0QsT0FBTyxVQUFVLE1BQVcsRUFBRSxHQUFXO1FBQ3ZDLGdDQUFnQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN4RixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLE1BQWMsRUFBRSxRQUFnQixFQUFFLEtBQWdDLElBQUk7SUFDdkcsT0FBTyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELENBQUMifQ==