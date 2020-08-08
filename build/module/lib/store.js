import { BehaviorSubject } from "rxjs";
export var ElementStatus;
(function (ElementStatus) {
    ElementStatus["PENDING"] = "PENDING";
    ElementStatus["ACTIVE"] = "ACTIVE";
})(ElementStatus || (ElementStatus = {}));
export class StoreElement {
    constructor(status = ElementStatus.ACTIVE, ownerProto) {
        this.observer = new BehaviorSubject(undefined);
        this.status = status;
        this.ownerPrototype = ownerProto;
        this.endpoints = new Map();
    }
    setOwner(owner) {
        this.owner = this.owner || owner;
    }
}
class StoreWrapper {
    constructor() {
        this.store = new Map();
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
    get(key) {
        return this.store.get(key);
    }
    getOrCreate(key, status) {
        let element = this.get(key);
        if (!element) {
            element = new StoreElement(status);
            element.observer = new BehaviorSubject(null);
            // A client may observe a key that was not set yet.
            yassiStore.set(key, element);
        }
        return element;
    }
    set(key, element) {
        this.store.set(key, element);
    }
    has(key) {
        return this.store.has(key);
    }
    ensureUniqueuness(key) {
        let elem = yassiStore.get(key);
        if (elem) {
            if (elem.status === ElementStatus.ACTIVE) {
                throw new Error(`Store already has an active entry with name ${key}`);
            }
            else {
                elem.status = ElementStatus.ACTIVE;
            }
        }
    }
    findElementsByOwner(target) {
        const elements = [];
        for (const val of this.store.values()) {
            if (val.ownerPrototype === target) {
                elements.push(val);
            }
        }
        return elements;
    }
}
export const yassiStore = new StoreWrapper();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFckMsTUFBTSxDQUFOLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUN2QixvQ0FBbUIsQ0FBQTtJQUNuQixrQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsYUFBYSxLQUFiLGFBQWEsUUFHeEI7QUFFRCxNQUFNLE9BQU8sWUFBWTtJQVF2QixZQUFZLFNBQXdCLGFBQWEsQ0FBQyxNQUFNLEVBQUUsVUFBZ0I7UUFIMUUsYUFBUSxHQUEwQixJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUkvRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7SUFDbkMsQ0FBQztDQUNGO0FBRUQsTUFBTSxZQUFZO0lBQWxCO1FBQ1UsVUFBSyxHQUE4QixJQUFJLEdBQUcsRUFBd0IsQ0FBQztRQStDM0Usd0JBQXdCO1FBQ3hCLHVCQUF1QjtRQUN2Qix1REFBdUQ7UUFDdkQsdUNBQXVDO1FBQ3ZDLHFEQUFxRDtRQUNyRCxNQUFNO1FBQ04sSUFBSTtRQUVKLG9DQUFvQztRQUNwQywrQ0FBK0M7UUFDL0Msb0JBQW9CO1FBQ3BCLG1CQUFtQjtRQUNuQixNQUFNO1FBQ04sMkJBQTJCO1FBQzNCLDRCQUE0QjtRQUM1QixvQ0FBb0M7UUFDcEMsTUFBTTtRQUNOLElBQUk7SUFDTixDQUFDO0lBL0RDLEdBQUcsQ0FBQyxHQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQVcsRUFBRSxNQUFxQjtRQUM1QyxJQUFJLE9BQU8sR0FBaUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxlQUFlLENBQU0sSUFBSSxDQUFDLENBQUM7WUFDbEQsbURBQW1EO1lBQ25ELFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFXLEVBQUUsT0FBcUI7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGlCQUFpQixDQUFDLEdBQVc7UUFDM0IsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxhQUFhLENBQUMsTUFBTSxFQUFFO2dCQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZFO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQzthQUNwQztTQUNGO0lBQ0gsQ0FBQztJQUVELG1CQUFtQixDQUFDLE1BQVc7UUFDN0IsTUFBTSxRQUFRLEdBQW1CLEVBQUUsQ0FBQztRQUNwQyxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxHQUFHLENBQUMsY0FBYyxLQUFLLE1BQU0sRUFBRTtnQkFDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtTQUNGO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQW9CRjtBQUVELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQyJ9