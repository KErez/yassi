export declare class YassiPropertyDescriptor {
    name: string;
    fullAccess: boolean;
    constructor(name: any, fullAccess?: boolean);
}
export declare function _yassit(name: string, targetObj?: any, targetProp?: string): (target: any, key: string) => void;
/**
 * To make sure the property definition is on the instance and not on the class you need to define the property
 *  to override itself with another property definition.
 *  This way when the class is loaded the property definition is called and set a new setter definition
 *  Now each time an instance is called the setter is called and set a new setter and getter definition
 * Thanks to Romke Van Der Meulen - https://romkevandermeulen.nl/2018/01/24/typescript-property-decorators.html
 */
export declare function overridePropertyDefinition(prototype: any, key: string, yassiDescriptor: YassiPropertyDescriptor): void;
export declare function overrideSelectPropertyDefinition(prototype: any, key: string, yassiDescriptor: YassiPropertyDescriptor, obsrv?: boolean): void;
export declare function _registerMiddleware(action: string, position: string, fn?: (proto: any, key: any, val: any) => void): void;
export declare function _facade(yassiDescriptor: YassiPropertyDescriptor, sourceElementDescriptors: YassiPropertyDescriptor[], fn: (yassiElementsValue: any[]) => any): void;
