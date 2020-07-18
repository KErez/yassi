import {BehaviorSubject} from "rxjs";

export enum ElementStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE'
}

export class StoreElement {
  status: ElementStatus;
  value: any;
  observer?: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(status: ElementStatus = ElementStatus.ACTIVE) {
    this.status = status;
  }
}

class StoreWrapper {
  private store: Map<string, StoreElement> = new Map<string, StoreElement>();

  get(key: string) {
    return this.store.get(key);
  }

  set(key: string, element: StoreElement) {
    this.store.set(key, element);
  }

  has(key: string) {
    return this.store.has(key);
  }

  ensureUniqueuness(key: string) {
    let element = this.store.get(key);
    if (element && element.status === ElementStatus.ACTIVE) {
      throw new Error(`Store already has entry with name ${key}`);
    }
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

