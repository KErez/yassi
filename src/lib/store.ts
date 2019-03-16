import {BehaviorSubject} from "rxjs";

export class StoreElement {
  value: any;
  obeserver?: BehaviorSubject<any>;
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
}

export const yassiStore: StoreWrapper = new StoreWrapper();
