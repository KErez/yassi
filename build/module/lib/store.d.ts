import { BehaviorSubject } from "rxjs";
export declare enum ElementStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE"
}
export declare class StoreElement {
    status: ElementStatus;
    value: any;
    observer?: BehaviorSubject<any>;
    constructor(status?: ElementStatus);
}
declare class StoreWrapper {
    private store;
    get(key: string): StoreElement;
    getOrCreate(key: string, status: ElementStatus): StoreElement;
    set(key: string, element: StoreElement): void;
    has(key: string): boolean;
    ensureUniqueuness(key: string): void;
}
export declare const yassiStore: StoreWrapper;
export {};
