declare class Yassi {
    yassit(yassiPropName: string, owner: object, property: string): (target: any, key: string) => void;
    observe(yassiPropName: string, targetObj: object, targetProp: string): void;
    select(yassiPropName: string, targetObj: object, targetProp: string): void;
    registerMiddleware(action: string, position: string, fn?: (proto: any, key: any, val: any) => void): void;
    facade(yassiPropName: string, yassiElementsName: string[], fn: (yassiElementsValue: any[]) => any): void;
    endpoint(targetInstance: any, key: string): void;
    communicate(yassiPropName: string, apiFunctionName: string, functionParams?: any[]): void;
    republish(yassiPropName: string): void;
}
export declare const yassi: Yassi;
export declare function yassit(yassiPropName: string, owner?: any, ownerProp?: string): (target: any, key: string) => void;
export declare function select(yassiPropName: any): (target: any, key: string) => void;
export declare function observe(yassiPropName: any): (target: any, key: string) => void;
export declare function endpoint(): (target: any, key: string) => void;
export declare function registerMiddleware(action: string, position: string, fn?: (proto: any, key: any, val: any) => void): void;
export {};
