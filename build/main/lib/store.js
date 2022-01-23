"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yassiStore = exports.StoreElement = exports.ElementStatus = void 0;
const rxjs_1 = require("rxjs");
var ElementStatus;
(function (ElementStatus) {
    ElementStatus["PENDING"] = "PENDING";
    ElementStatus["ACTIVE"] = "ACTIVE";
})(ElementStatus = exports.ElementStatus || (exports.ElementStatus = {}));
class StoreElement {
    constructor(status = ElementStatus.ACTIVE, ownerProto) {
        this.observer = new rxjs_1.BehaviorSubject(undefined);
        this.status = status;
        this.ownerPrototype = ownerProto;
        this.endpoints = new Map();
    }
    setOwner(owner) {
        this.owner = this.owner || owner;
    }
}
exports.StoreElement = StoreElement;
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
            element.observer = new rxjs_1.BehaviorSubject(null);
            // A client may observe a key that was not set yet.
            exports.yassiStore.set(key, element);
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
        let elem = exports.yassiStore.get(key);
        if (elem) {
            if (elem.status === ElementStatus.ACTIVE) {
                const err = new Error(`Store already has an active entry with name ${key}`);
                err.type = 'duplicate';
                throw err;
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
exports.yassiStore = new StoreWrapper();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUFxQztBQUVyQyxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDdkIsb0NBQW1CLENBQUE7SUFDbkIsa0NBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUhXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBR3hCO0FBRUQsTUFBYSxZQUFZO0lBUXZCLFlBQVksU0FBd0IsYUFBYSxDQUFDLE1BQU0sRUFBRSxVQUFnQjtRQUgxRSxhQUFRLEdBQTBCLElBQUksc0JBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUkvRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7SUFDbkMsQ0FBQztDQUNGO0FBakJELG9DQWlCQztBQUVELE1BQU0sWUFBWTtJQUFsQjtRQUNVLFVBQUssR0FBOEIsSUFBSSxHQUFHLEVBQXdCLENBQUM7UUFpRDNFLHdCQUF3QjtRQUN4Qix1QkFBdUI7UUFDdkIsdURBQXVEO1FBQ3ZELHVDQUF1QztRQUN2QyxxREFBcUQ7UUFDckQsTUFBTTtRQUNOLElBQUk7UUFFSixvQ0FBb0M7UUFDcEMsK0NBQStDO1FBQy9DLG9CQUFvQjtRQUNwQixtQkFBbUI7UUFDbkIsTUFBTTtRQUNOLDJCQUEyQjtRQUMzQiw0QkFBNEI7UUFDNUIsb0NBQW9DO1FBQ3BDLE1BQU07UUFDTixJQUFJO0lBQ04sQ0FBQztJQWpFQyxHQUFHLENBQUMsR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFXLEVBQUUsTUFBcUI7UUFDNUMsSUFBSSxPQUFPLEdBQWlCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztZQUNsRCxtREFBbUQ7WUFDbkQsa0JBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFXLEVBQUUsT0FBcUI7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGlCQUFpQixDQUFDLEdBQVc7UUFDM0IsSUFBSSxJQUFJLEdBQUcsa0JBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTtnQkFDeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsK0NBQStDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLEdBQVcsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO2dCQUNoQyxNQUFNLEdBQUcsQ0FBQzthQUNYO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQzthQUNwQztTQUNGO0lBQ0gsQ0FBQztJQUVELG1CQUFtQixDQUFDLE1BQVc7UUFDN0IsTUFBTSxRQUFRLEdBQW1CLEVBQUUsQ0FBQztRQUNwQyxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxHQUFHLENBQUMsY0FBYyxLQUFLLE1BQU0sRUFBRTtnQkFDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtTQUNGO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQW9CRjtBQUVZLFFBQUEsVUFBVSxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDIn0=