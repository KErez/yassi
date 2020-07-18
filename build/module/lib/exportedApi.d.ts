declare class Yassi {
    yassit(name: string, owner: object, property: string): (target: any, key: string) => void;
    observe(name: string, owner: object, property: string): void;
    select(name: string, owner: object, property: string): void;
    registerMiddleware(action: string, position: string, fn?: (proto: any, key: any, val: any) => void): void;
}
declare const yassi: Yassi;
export default yassi;
export declare function yassit(name: string, targetObj?: any, targetProp?: string): (target: any, key: string) => void;
export declare function select(name: any): (target: any, key: string) => void;
export declare function observe(name: any): (target: any, key: string) => void;
export declare function registerMiddleware(action: string, position: string, fn?: (proto: any, key: any, val: any) => void): void;
