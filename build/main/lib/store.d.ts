import { BehaviorSubject } from "rxjs";
export declare enum ElementStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE"
}
export declare class StoreElement {
    status: ElementStatus;
    owner?: any;
    ownerPrototype: any;
    value: any;
    observer?: BehaviorSubject<any>;
    endpoints: Map<string, (...params: any[]) => void>;
    constructor(status?: ElementStatus, ownerProto?: any);
    setOwner(owner: any): void;
}
declare class StoreWrapper {
    private store;
    get(key: string): StoreElement;
    getOrCreate(key: string, status: ElementStatus): StoreElement;
    set(key: string, element: StoreElement): void;
    has(key: string): boolean;
    ensureUniqueuness(key: string): void;
    findElementsByOwner(target: any): StoreElement[];
}
export declare const yassiStore: StoreWrapper;
export {};
