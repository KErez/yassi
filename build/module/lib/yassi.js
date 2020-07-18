import { BehaviorSubject } from 'rxjs';
import { ElementStatus, StoreElement, yassiStore } from './store';
const beforeYassitMiddleware = [];
const afterYassitMiddleware = [];
const beforeSelectingMiddleware = [];
const afterSelectingMiddleware = [];
function DEFAULT_LOGGER_MIDDLEWARE(prototype, key, value) {
    if (prototype) {
        if (prototype.constructor && prototype.constructor.name) {
            console.log(`${prototype.constructor.name}.${key}=${JSON.stringify(value)}`);
        }
        else {
            console.log(`${prototype}.${key}=${JSON.stringify(value)}`);
        }
    }
}
export class YassiPropertyDescriptor {
    constructor(name, fullAccess = false) {
        this.name = name;
        this.fullAccess = fullAccess;
    }
}
/**
 * To make sure the property definition is on the instance and not on the class you need to define the property
 *  to override itself with another property definition.
 *  This way when the class is loaded the property definition is called and set a new setter definition
 *  Now each time an instance is called the setter is called and set a new setter and getter definition
 * Thanks to Romke Van Der Meulen - https://romkevandermeulen.nl/2018/01/24/typescript-property-decorators.html
 */
export function overridePropertyDefinition(prototype, key, yassiDescriptor) {
    if (yassiStore.has(yassiDescriptor.name)) {
        throw new Error(`Store already has entry with name ${yassiDescriptor.name}`);
    }
    yassiStore.ensureUniqueuness(yassiDescriptor.name);
    /**
     * prototype - The constructor of the class that declared yassit on a property
     * key - the property name that yassit was attached too
     */
    Object.defineProperty(prototype, key, {
        set(firstValue) {
            Object.defineProperty(this, key, {
                // this - the instance of a 'prototype' class
                get() {
                    let elem = yassiStore.get(yassiDescriptor.name);
                    return elem ? elem.value : undefined;
                },
                set(value) {
                    executeBeforeYassitMiddleware(prototype, key, value);
                    let elem = yassiStore.get(yassiDescriptor.name) || new StoreElement();
                    setElementValueHandler(elem, value, prototype, key);
                    yassiStore.set(yassiDescriptor.name, elem);
                    if (elem.value && !Array.isArray(elem.value)) {
                        elem.observer.next(elem.value);
                    }
                    executeAfterYassitMiddleware(prototype, key, elem.value);
                },
                enumerable: true,
            });
            this[key] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
}
function setElementValueHandler(element, value, prototype, key) {
    if (Array.isArray(value)) {
        // a proxy for our array
        element.value = new Proxy(value, {
            // apply(target: any, thisArg, argumentList?: any) {
            //   executeBeforeYassitMiddleware(prototype, key, value);
            //   const result = thisArg[target].apply(this, argumentList);
            //   element.observer.next(element.value);
            //   executeAfterYassitMiddleware(prototype, key, element.value);
            //   return result;
            // },
            // @ts-ignore
            deleteProperty(target, property) {
                return true;
            },
            // @ts-ignore
            set(target, property, val, receiver) {
                if (!Number.isInteger(parseInt(property, 10))) {
                    target[property] = val;
                    return true;
                }
                executeBeforeYassitMiddleware(prototype, key, element.value);
                target[property] = val;
                element.observer.next(element.value);
                executeAfterYassitMiddleware(prototype, key, element.value);
                return true;
            }
        });
    }
    else if (typeof (value) === 'object') {
        element.value = new Proxy(value, {
            // @ts-ignore
            deleteProperty(target, property) {
                return true;
            },
            // @ts-ignore
            set(target, property, val, receiver) {
                if (!target[property] || target.hasOwnProperty(property)) {
                    executeBeforeYassitMiddleware(prototype, key, value);
                    target[property] = val;
                    element.observer.next(element.value);
                    executeAfterYassitMiddleware(prototype, key, element.value);
                }
                else {
                    target[property] = val;
                }
                return true;
            }
        });
    }
    else {
        element.value = value;
    }
}
export function overrideSelectPropertyDefinition(prototype, key, yassiDescriptor, obsrv = false) {
    Object.defineProperty(prototype, key, {
        get() {
            let result;
            executeBeforeSelectMiddleware(prototype, key);
            let element = yassiStore.get(yassiDescriptor.name);
            if (obsrv) {
                let elem = element || new StoreElement(ElementStatus.PENDING);
                elem.observer = elem.observer || new BehaviorSubject(elem.value);
                if (!element) {
                    // A client may observe a key that was not set yet.
                    yassiStore.set(yassiDescriptor.name, elem);
                }
                result = elem.observer.asObservable();
            }
            else {
                result = element ? element.value : undefined;
            }
            executeAfterSelectMiddleware(prototype, key, element ? element.value : null);
            return result;
        }
        // We don't create setter since we want selected properties to behave like readonly properties
    });
}
export function _registerMiddleware(action, position, fn = null) {
    fn = fn || DEFAULT_LOGGER_MIDDLEWARE;
    let arrayToSearch;
    switch (action) {
        case 'yassit':
            arrayToSearch = (position === 'after') ? afterYassitMiddleware : beforeYassitMiddleware;
            break;
        case 'observe':
        case 'select':
            arrayToSearch = (position === 'after') ? afterSelectingMiddleware : beforeSelectingMiddleware;
            break;
        default:
            return;
    }
    for (let item of arrayToSearch) {
        // prevent duplication
        if (item === fn) {
            return;
        }
    }
    arrayToSearch.push(fn);
}
// @ts-ignore
function executeBeforeYassitMiddleware(prototype, key, value) {
    for (let item of beforeYassitMiddleware) {
        item(prototype, key, value);
    }
}
// @ts-ignore
function executeAfterYassitMiddleware(prototype, key, value) {
    for (let item of afterYassitMiddleware) {
        item(prototype, key, value);
    }
}
// @ts-ignore
function executeBeforeSelectMiddleware(prototype, key) {
    for (let item of beforeSelectingMiddleware) {
        item(prototype, key);
    }
}
// @ts-ignore
function executeAfterSelectMiddleware(prototype, key, value) {
    for (let item of afterSelectingMiddleware) {
        item(prototype, key, value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3lhc3NpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdkMsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBR2xFLE1BQU0sc0JBQXNCLEdBQUcsRUFBRSxDQUFDO0FBQ2xDLE1BQU0scUJBQXFCLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLE1BQU0seUJBQXlCLEdBQUcsRUFBRSxDQUFDO0FBQ3JDLE1BQU0sd0JBQXdCLEdBQUcsRUFBRSxDQUFDO0FBRXBDLFNBQVMseUJBQXlCLENBQUMsU0FBYyxFQUFFLEdBQVcsRUFBRSxLQUFVO0lBQ3hFLElBQUksU0FBUyxFQUFFO1FBQ2IsSUFBSSxTQUFTLENBQUMsV0FBVyxJQUFJLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUU7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdEO0tBQ0Y7QUFDSCxDQUFDO0FBRUQsTUFBTSxPQUFPLHVCQUF1QjtJQU1sQyxZQUFZLElBQUksRUFBRSxVQUFVLEdBQUcsS0FBSztRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0NBQ0Y7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsMEJBQTBCLENBQUMsU0FBYyxFQUNyQixHQUFXLEVBQ1gsZUFBd0M7SUFDMUUsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtLQUM3RTtJQUNELFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbkQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ3BDLEdBQUcsQ0FBQyxVQUFlO1lBQ2pCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDL0IsNkNBQTZDO2dCQUM3QyxHQUFHO29CQUNELElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUN2QyxDQUFDO2dCQUNELEdBQUcsQ0FBQyxLQUFVO29CQUNaLDZCQUE2QixDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3JELElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksWUFBWSxFQUFFLENBQUM7b0JBQ3RFLHNCQUFzQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNwRCxVQUFVLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzNDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDO3dCQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2hDO29CQUNELDRCQUE0QixDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzRCxDQUFDO2dCQUNELFVBQVUsRUFBRSxJQUFJO2FBQ2pCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDekIsQ0FBQztRQUNELFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFlBQVksRUFBRSxJQUFJO0tBQ25CLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLHNCQUFzQixDQUFDLE9BQXFCLEVBQUUsS0FBVSxFQUFFLFNBQWMsRUFBRSxHQUFXO0lBQzVGLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4Qix3QkFBd0I7UUFDeEIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDL0Isb0RBQW9EO1lBQ3BELDBEQUEwRDtZQUMxRCw4REFBOEQ7WUFDOUQsMENBQTBDO1lBQzFDLGlFQUFpRTtZQUNqRSxtQkFBbUI7WUFDbkIsS0FBSztZQUNMLGFBQWE7WUFDYixjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVE7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELGFBQWE7WUFDYixHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUTtnQkFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtvQkFDdkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztvQkFDdkIsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBQ0QsNkJBQTZCLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ3ZCLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckMsNEJBQTRCLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzVELE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztTQUNGLENBQUMsQ0FBQztLQUNKO1NBQU0sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQ3RDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQy9CLGFBQWE7WUFDYixjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVE7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELGFBQWE7WUFDYixHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUTtnQkFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN4RCw2QkFBNkIsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNyRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO29CQUN2QixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3JDLDRCQUE0QixDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM3RDtxQkFBTTtvQkFDTCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUN4QjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7U0FDRixDQUFDLENBQUE7S0FDSDtTQUFNO1FBQ0wsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDdkI7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLGdDQUFnQyxDQUFDLFNBQWMsRUFDckIsR0FBVyxFQUNYLGVBQXdDLEVBQ3hDLFFBQWlCLEtBQUs7SUFDOUQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1FBQ3BDLEdBQUc7WUFDRCxJQUFJLE1BQVcsQ0FBQztZQUNoQiw2QkFBNkIsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDOUMsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxJQUFJLEdBQUcsT0FBTyxJQUFJLElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEUsSUFBRyxDQUFDLE9BQU8sRUFBRTtvQkFDWCxtREFBbUQ7b0JBQ25ELFVBQVUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkM7aUJBQU07Z0JBQ0wsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2FBQzlDO1lBQ0QsNEJBQTRCLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdFLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFDRCw4RkFBOEY7S0FDL0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxLQUFnQyxJQUFJO0lBQ3hHLEVBQUUsR0FBRyxFQUFFLElBQUkseUJBQXlCLENBQUM7SUFDckMsSUFBSSxhQUFhLENBQUM7SUFDbEIsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLFFBQVE7WUFDWCxhQUFhLEdBQUcsQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztZQUN4RixNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUM7UUFDZixLQUFLLFFBQVE7WUFDWCxhQUFhLEdBQUcsQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQztZQUM5RixNQUFNO1FBQ1I7WUFDRSxPQUFPO0tBQ1Y7SUFFRCxLQUFLLElBQUksSUFBSSxJQUFJLGFBQWEsRUFBRTtRQUM5QixzQkFBc0I7UUFDdEIsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ2YsT0FBTztTQUNSO0tBQ0Y7SUFDRCxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFFRCxhQUFhO0FBQ2IsU0FBUyw2QkFBNkIsQ0FBQyxTQUFjLEVBQUUsR0FBVyxFQUFFLEtBQVU7SUFDNUUsS0FBSyxJQUFJLElBQUksSUFBSSxzQkFBc0IsRUFBRTtRQUN2QyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM3QjtBQUNILENBQUM7QUFFRCxhQUFhO0FBQ2IsU0FBUyw0QkFBNEIsQ0FBQyxTQUFjLEVBQUUsR0FBVyxFQUFFLEtBQVU7SUFDM0UsS0FBSyxJQUFJLElBQUksSUFBSSxxQkFBcUIsRUFBRTtRQUN0QyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM3QjtBQUNILENBQUM7QUFFRCxhQUFhO0FBQ2IsU0FBUyw2QkFBNkIsQ0FBQyxTQUFjLEVBQUUsR0FBVztJQUNoRSxLQUFLLElBQUksSUFBSSxJQUFJLHlCQUF5QixFQUFFO1FBQzFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDdEI7QUFDSCxDQUFDO0FBRUQsYUFBYTtBQUNiLFNBQVMsNEJBQTRCLENBQUMsU0FBYyxFQUFFLEdBQVcsRUFBRSxLQUFVO0lBQzNFLEtBQUssSUFBSSxJQUFJLElBQUksd0JBQXdCLEVBQUU7UUFDekMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDN0I7QUFDSCxDQUFDIn0=