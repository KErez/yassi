import { _registerMiddleware, overridePropertyDefinition, overrideSelectPropertyDefinition, YassiPropertyDescriptor } from './yassi';
class Yassi {
    yassit(name, owner, property) {
        return yassit(name, owner, property);
    }
    observe(name, owner, property) {
        return overrideSelectPropertyDefinition(owner, property, new YassiPropertyDescriptor(name), true);
    }
    select(name, owner, property) {
        return overrideSelectPropertyDefinition(owner, property, new YassiPropertyDescriptor(name), false);
    }
    registerMiddleware(action, position, fn = null) {
        return registerMiddleware(action, position, fn);
    }
}
// The default exported object is the support to none annotated solution
const yassi = new Yassi();
export default yassi;
// Function expoerted from here are annotation solutions
export function yassit(name, targetObj, targetProp) {
    if (!name || name.length <= 0) {
        throw new Error('You must provide property name when using @yassit()');
    }
    if (targetObj && targetProp) {
        // When the call to yassit was made directly without annotation
        overridePropertyDefinition(targetObj, targetProp, new YassiPropertyDescriptor(name));
        return null;
    }
    // TODO: provide property descriptor from strategy class (i.e. allow different type of property storing
    return function (target, key) {
        overridePropertyDefinition(target, key, new YassiPropertyDescriptor(name));
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0ZWRBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2V4cG9ydGVkQXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSwwQkFBMEIsRUFBRSxnQ0FBZ0MsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUVySSxNQUFNLEtBQUs7SUFDVCxNQUFNLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxRQUFnQjtRQUNsRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxRQUFnQjtRQUNuRCxPQUFPLGdDQUFnQyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVksRUFBRSxLQUFhLEVBQUUsUUFBZ0I7UUFDbEQsT0FBTyxnQ0FBZ0MsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDckcsQ0FBQztJQUVELGtCQUFrQixDQUFDLE1BQWMsRUFBRSxRQUFnQixFQUFFLEtBQWdDLElBQUk7UUFDdkYsT0FBTyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDRjtBQUNELHdFQUF3RTtBQUN4RSxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQzFCLGVBQWUsS0FBSyxDQUFDO0FBRXJCLHdEQUF3RDtBQUN4RCxNQUFNLFVBQVUsTUFBTSxDQUFDLElBQVksRUFBRSxTQUFlLEVBQUUsVUFBbUI7SUFDdkUsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7S0FDeEU7SUFFRCxJQUFJLFNBQVMsSUFBSSxVQUFVLEVBQUU7UUFDM0IsK0RBQStEO1FBQy9ELDBCQUEwQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCx1R0FBdUc7SUFDdkcsT0FBTyxVQUFTLE1BQVcsRUFBRSxHQUFXO1FBQ3RDLDBCQUEwQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUFDLElBQUk7SUFDekIsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLG1FQUFtRSxDQUFDLENBQUM7S0FDdEY7SUFDRCxPQUFPLFVBQVUsTUFBVyxFQUFFLEdBQVc7UUFDdkMsZ0NBQWdDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDbEYsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUMsSUFBSTtJQUMxQixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0VBQW9FLENBQUMsQ0FBQztLQUN2RjtJQUNELE9BQU8sVUFBVSxNQUFXLEVBQUUsR0FBVztRQUN2QyxnQ0FBZ0MsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDeEYsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxLQUFnQyxJQUFJO0lBQ3ZHLE9BQU8sbUJBQW1CLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNuRCxDQUFDIn0=