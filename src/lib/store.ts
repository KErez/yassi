import {BehaviorSubject} from "rxjs";

export enum ElementStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE'
}

export class StoreElement {
  status: ElementStatus;
  owner?: any; // TODO: Should it be a weak reference to avoid memory leaks???
  ownerPrototype: any;
  value: any;
  observer?: BehaviorSubject<any> = new BehaviorSubject(undefined);
  endpoints: Map<string, (...params) => void>;

  constructor(status: ElementStatus = ElementStatus.ACTIVE, ownerProto?: any) {
    this.status = status;
    this.ownerPrototype = ownerProto;
    this.endpoints = new Map();
  }

  setOwner(owner: any) {
    this.owner = this.owner || owner;
  }
}

class StoreWrapper {
  private store: Map<string, StoreElement> = new Map<string, StoreElement>();

  get(key: string) {
    return this.store.get(key);
  }

  getOrCreate(key: string, status: ElementStatus) {
    let element: StoreElement = this.get(key);
    if (!element) {
      element = new StoreElement(status);
      element.observer = new BehaviorSubject<any>(null);
      // A client may observe a key that was not set yet.
      yassiStore.set(key, element);
    }
    return element;
  }

  set(key: string, element: StoreElement) {
    this.store.set(key, element);
  }

  has(key: string) {
    return this.store.has(key);
  }

  ensureUniqueuness(key: string) {
    let elem = yassiStore.get(key);
    if (elem) {
      if (elem.status === ElementStatus.ACTIVE) {
        throw new Error(`Store already has an active entry with name ${key}`);
      } else {
        elem.status = ElementStatus.ACTIVE;
      }
    }
  }

  findElementsByOwner(target: any): StoreElement[] {
    const elements: StoreElement[] = [];
    for (const val of this.store.values()) {
      if (val.ownerPrototype === target) {
        elements.push(val);
      }
    }

    return elements;
  }

  ////// Deprecate methods
  // touch(key: string) {
  //   const element: StoreElement = this.store.get(key);
  //   if (element && element.observer) {
  //     element.observer.next(element.observer.value);
  //   }
  // }

  // update(key: string, value: any) {
  //   let element: StoreElement = this.get(key);
  //   if (!element) {
  //     return null;
  //   }
  //   element.value = value;
  //   if (element.observer) {
  //     element.observer.next(value);
  //   }
  // }
}

export const yassiStore: StoreWrapper = new StoreWrapper();

