/**
 * Yassi - Yet Another Simple Store Implementation.
 * This is the main class exported from Yassi library. For further usage please refer to https://github.com/KErez/yassi
 */
declare class Yassi {
    /**
     * An acronym for yassi it. This is the non annotated version of the yassit operator
     * @param yassiPropName
     * @param owner
     * @param property
     */
    yassit(yassiPropName: string, owner: object, property: string): (target: any, key: string) => void;
    observe(yassiPropName: string, targetObj: object, targetProp: string): void;
    select(yassiPropName: string, targetObj: object, targetProp: string): void;
    get(yassiPropName: string): any;
    registerMiddleware(action: string, position: string, fn?: (proto: any, key: any, val: any) => void): void;
    facade(yassiPropName: string, yassiElementsName: string[], fn: (yassiElementsValue: any[]) => any): void;
    endpoint(targetInstance: any, key: string): void;
    communicate(yassiPropName: string, apiFunctionName: string, functionParams: any): void;
    castRequest(yassiPropName: string, apiFunctionName: string, ...functionParams: any[]): void;
    republish(yassiPropName: string): void;
}
export declare const yassi: Yassi;
/**
 * An acronym for yassi it. This operator registers an object's property in the store.
 * @param yassiPropName - The id that will use to store it in the store
 * @param owner - The class object that its property was annotated with yassit
 * @param ownerProp - the actual property that was annotated.
 */
export declare function yassit(yassiPropName: string, owner?: any, ownerProp?: string): (target: any, key: string) => void;
/**
 * Operator to attach the yassi property in the store to the annotated property.
 * Note that the annotated property will be a readonly property and will throw error if you try to change its value directly
 * @param yassiPropName
 */
export declare function select(yassiPropName: any): (target: any, key: string) => void;
/**
 * Similar to select operator but instead of returning the actual value it returns a reactive observable that will fire the value and
 *  every change on it.
 * Note that the annotated property will be a readonly property and will throw error if you try to change its value directly
 * @param yassiPropName
 */
export declare function observe(yassiPropName: any): (target: any, key: string) => void;
/**
 * Register the annotated function as an endpoint for the `communicate` operator.
 */
export declare function endpoint(): (target: any, key: string) => void;
/**
 * Register a middleware function that will execute on each event from the actions yassit/select/observe operator
 *  either before or after the change to the store as depict by the position parameter.
 * If a function is not provided, yassi will register the default middleware which print the event to the console.
 * @param action - Either yassit, select or observe
 * @param position - either after or before to define if the function will execute before or after the event etends to thge store
 * @param fn - a function that will execute on each event as described above.
 * If not provided, a default print to console function will executed
 */
export declare function registerMiddleware(action: string, position: string, fn?: (proto: any, key: any, val: any) => void): void;
export {};
