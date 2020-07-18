"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
var ElementStatus;
(function (ElementStatus) {
    ElementStatus["PENDING"] = "PENDING";
    ElementStatus["ACTIVE"] = "ACTIVE";
})(ElementStatus = exports.ElementStatus || (exports.ElementStatus = {}));
class StoreElement {
    constructor(status = ElementStatus.ACTIVE) {
        this.observer = new rxjs_1.BehaviorSubject(undefined);
        this.status = status;
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
exports.yassiStore = new StoreWrapper();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQXFDO0FBRXJDLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUN2QixvQ0FBbUIsQ0FBQTtJQUNuQixrQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFHeEI7QUFFRCxNQUFhLFlBQVk7SUFLdkIsWUFBWSxTQUF3QixhQUFhLENBQUMsTUFBTTtRQUZ4RCxhQUFRLEdBQTBCLElBQUksc0JBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUcvRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUFSRCxvQ0FRQztBQUVELE1BQU0sWUFBWTtJQUFsQjtRQUNVLFVBQUssR0FBOEIsSUFBSSxHQUFHLEVBQXdCLENBQUM7UUFxQjNFLHdCQUF3QjtRQUN4Qix1QkFBdUI7UUFDdkIsdURBQXVEO1FBQ3ZELHVDQUF1QztRQUN2QyxxREFBcUQ7UUFDckQsTUFBTTtRQUNOLElBQUk7UUFFSixvQ0FBb0M7UUFDcEMsK0NBQStDO1FBQy9DLG9CQUFvQjtRQUNwQixtQkFBbUI7UUFDbkIsTUFBTTtRQUNOLDJCQUEyQjtRQUMzQiw0QkFBNEI7UUFDNUIsb0NBQW9DO1FBQ3BDLE1BQU07UUFDTixJQUFJO0lBQ04sQ0FBQztJQXJDQyxHQUFHLENBQUMsR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFXLEVBQUUsT0FBcUI7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGlCQUFpQixDQUFDLEdBQVc7UUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3RELE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDO0NBb0JGO0FBRVksUUFBQSxVQUFVLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUMifQ==