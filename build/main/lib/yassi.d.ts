export declare function yassit(name: string): (target: any, key: string) => void;
export declare function select(name: any): (target: any, key: string) => void;
export declare function observe(name: any): (target: any, key: string) => void;
export declare function registerMiddleware(action: string, position: string, fn?: (proto: any, key: any, val: any) => void): void;
