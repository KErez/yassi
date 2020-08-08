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
                throw new Error(`Store already has an active entry with name ${key}`);
            }
            else {
                elem.status = ElementStatus.ACTIVE;
            }
        }
    }
}
exports.yassiStore = new StoreWrapper();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQXFDO0FBRXJDLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUN2QixvQ0FBbUIsQ0FBQTtJQUNuQixrQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFHeEI7QUFFRCxNQUFhLFlBQVk7SUFNdkIsWUFBWSxTQUF3QixhQUFhLENBQUMsTUFBTTtRQUZ4RCxhQUFRLEdBQTBCLElBQUksc0JBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUcvRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQVU7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztJQUNuQyxDQUFDO0NBQ0Y7QUFiRCxvQ0FhQztBQUVELE1BQU0sWUFBWTtJQUFsQjtRQUNVLFVBQUssR0FBOEIsSUFBSSxHQUFHLEVBQXdCLENBQUM7UUFvQzNFLHdCQUF3QjtRQUN4Qix1QkFBdUI7UUFDdkIsdURBQXVEO1FBQ3ZELHVDQUF1QztRQUN2QyxxREFBcUQ7UUFDckQsTUFBTTtRQUNOLElBQUk7UUFFSixvQ0FBb0M7UUFDcEMsK0NBQStDO1FBQy9DLG9CQUFvQjtRQUNwQixtQkFBbUI7UUFDbkIsTUFBTTtRQUNOLDJCQUEyQjtRQUMzQiw0QkFBNEI7UUFDNUIsb0NBQW9DO1FBQ3BDLE1BQU07UUFDTixJQUFJO0lBQ04sQ0FBQztJQXBEQyxHQUFHLENBQUMsR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFXLEVBQUUsTUFBcUI7UUFDNUMsSUFBSSxPQUFPLEdBQWlCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksc0JBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztZQUNsRCxtREFBbUQ7WUFDbkQsa0JBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFXLEVBQUUsT0FBcUI7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGlCQUFpQixDQUFDLEdBQVc7UUFDM0IsSUFBSSxJQUFJLEdBQUcsa0JBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTtnQkFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsR0FBRyxFQUFFLENBQUMsQ0FBQzthQUN2RTtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7YUFDcEM7U0FDRjtJQUNILENBQUM7Q0FvQkY7QUFFWSxRQUFBLFVBQVUsR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQyJ9