import { BehaviorSubject } from "rxjs";
export var ElementStatus;
(function (ElementStatus) {
    ElementStatus["PENDING"] = "PENDING";
    ElementStatus["ACTIVE"] = "ACTIVE";
})(ElementStatus || (ElementStatus = {}));
export class StoreElement {
    constructor(status = ElementStatus.ACTIVE) {
        this.observer = new BehaviorSubject(undefined);
        this.status = status;
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
    set(key, element) {
        this.store.set(key, element);
    }
    has(key) {
        return this.store.has(key);
    }
    ensureUniqueuness(key) {
        let element = this.store.get(key);
        if (element && element.status === ElementStatus.ACTIVE) {
            throw new Error(`Store already has entry with name ${key}`);
        }
    }
}
export const yassiStore = new StoreWrapper();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFckMsTUFBTSxDQUFOLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUN2QixvQ0FBbUIsQ0FBQTtJQUNuQixrQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsYUFBYSxLQUFiLGFBQWEsUUFHeEI7QUFFRCxNQUFNLE9BQU8sWUFBWTtJQUt2QixZQUFZLFNBQXdCLGFBQWEsQ0FBQyxNQUFNO1FBRnhELGFBQVEsR0FBMEIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFHL0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBRUQsTUFBTSxZQUFZO0lBQWxCO1FBQ1UsVUFBSyxHQUE4QixJQUFJLEdBQUcsRUFBd0IsQ0FBQztRQXFCM0Usd0JBQXdCO1FBQ3hCLHVCQUF1QjtRQUN2Qix1REFBdUQ7UUFDdkQsdUNBQXVDO1FBQ3ZDLHFEQUFxRDtRQUNyRCxNQUFNO1FBQ04sSUFBSTtRQUVKLG9DQUFvQztRQUNwQywrQ0FBK0M7UUFDL0Msb0JBQW9CO1FBQ3BCLG1CQUFtQjtRQUNuQixNQUFNO1FBQ04sMkJBQTJCO1FBQzNCLDRCQUE0QjtRQUM1QixvQ0FBb0M7UUFDcEMsTUFBTTtRQUNOLElBQUk7SUFDTixDQUFDO0lBckNDLEdBQUcsQ0FBQyxHQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQVcsRUFBRSxPQUFxQjtRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsR0FBVztRQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7Q0FvQkY7QUFFRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUMifQ==