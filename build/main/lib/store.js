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
    touch(key) {
        const element = this.store.get(key);
        if (element && element.observer) {
            element.observer.next(element.observer.value);
        }
    }
    update(key, value) {
        let element = this.get(key);
        element.value = value;
        if (element.observer) {
            element.observer.next(value);
        }
    }
}
exports.yassiStore = new StoreWrapper();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQXFDO0FBRXJDLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUN2QixvQ0FBbUIsQ0FBQTtJQUNuQixrQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFHeEI7QUFFRCxNQUFhLFlBQVk7SUFLdkIsWUFBWSxTQUF3QixhQUFhLENBQUMsTUFBTTtRQUZ4RCxhQUFRLEdBQTBCLElBQUksc0JBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUcvRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUFSRCxvQ0FRQztBQUVELE1BQU0sWUFBWTtJQUFsQjtRQUNVLFVBQUssR0FBOEIsSUFBSSxHQUFHLEVBQXdCLENBQUM7SUFtQzdFLENBQUM7SUFqQ0MsR0FBRyxDQUFDLEdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBVyxFQUFFLE9BQXFCO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxHQUFXO1FBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUN0RCxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFXO1FBQ2YsTUFBTSxPQUFPLEdBQWlCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDL0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsR0FBVyxFQUFFLEtBQVU7UUFDNUIsSUFBSSxPQUFPLEdBQWlCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztDQUNGO0FBRVksUUFBQSxVQUFVLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUMifQ==