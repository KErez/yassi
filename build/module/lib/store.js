import { BehaviorSubject } from "rxjs";
export var ElementStatus;
(function (ElementStatus) {
    ElementStatus["PENDING"] = "PENDING";
    ElementStatus["ACTIVE"] = "ACTIVE";
})(ElementStatus || (ElementStatus = {}));
export class StoreElement {
    status;
    owner; // TODO: Should it be a weak reference to avoid memory leaks???
    ownerPrototype;
    value;
    observer = new BehaviorSubject(undefined);
    endpoints;
    constructor(status = ElementStatus.ACTIVE, ownerProto) {
        this.status = status;
        this.ownerPrototype = ownerProto;
        this.endpoints = new Map();
    }
    setOwner(owner) {
        this.owner = this.owner || owner;
    }
}
class StoreWrapper {
    store = new Map();
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
export const yassiStore = new StoreWrapper();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFckMsTUFBTSxDQUFOLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUN2QixvQ0FBbUIsQ0FBQTtJQUNuQixrQ0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsYUFBYSxLQUFiLGFBQWEsUUFHeEI7QUFFRCxNQUFNLE9BQU8sWUFBWTtJQUN2QixNQUFNLENBQWdCO0lBQ3RCLEtBQUssQ0FBTyxDQUFDLCtEQUErRDtJQUM1RSxjQUFjLENBQU07SUFDcEIsS0FBSyxDQUFNO0lBQ1gsUUFBUSxHQUEwQixJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRSxTQUFTLENBQW1DO0lBRTVDLFlBQVksU0FBd0IsYUFBYSxDQUFDLE1BQU0sRUFBRSxVQUFnQjtRQUN4RSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7SUFDbkMsQ0FBQztDQUNGO0FBRUQsTUFBTSxZQUFZO0lBQ1IsS0FBSyxHQUE4QixJQUFJLEdBQUcsRUFBd0IsQ0FBQztJQUUzRSxHQUFHLENBQUMsR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFXLEVBQUUsTUFBcUI7UUFDNUMsSUFBSSxPQUFPLEdBQWlCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO1lBQ2xELG1EQUFtRDtZQUNuRCxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM5QjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBVyxFQUFFLE9BQXFCO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxHQUFXO1FBQzNCLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTtnQkFDeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsK0NBQStDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLEdBQVcsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO2dCQUNoQyxNQUFNLEdBQUcsQ0FBQzthQUNYO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQzthQUNwQztTQUNGO0lBQ0gsQ0FBQztJQUVELG1CQUFtQixDQUFDLE1BQVc7UUFDN0IsTUFBTSxRQUFRLEdBQW1CLEVBQUUsQ0FBQztRQUNwQyxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxHQUFHLENBQUMsY0FBYyxLQUFLLE1BQU0sRUFBRTtnQkFDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtTQUNGO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQW9CRjtBQUVELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQyJ9