function makePropertyMapper<T>(prototype: any, key: string, mapper: (value: any) => T) {
	const values = new Map<any, T>();
	Object.defineProperty(prototype, key, {
		set(firstValue: any) {
			Object.defineProperty(this, key, {
				get() {
					return values.get(this);
				},
				set(value: any) {
					values.set(this, mapper(value));
				},
				enumerable: true,
			});
			this[key] = firstValue;
		},
		enumerable: true,
		configurable: true,
	});
}

const store = {};

export function exampleDecorator(multiplier: number) {
  console.log(`Multiplier is: ${multiplier}`);
	return function(target: any, key: string) {
    debugger;
		makePropertyMapper(target, key, (value: number) => {
			return value * multiplier;
		});
	};
}
let yidCounter :number = 0; // yassi id counter
// yid -> yassi id
export function storeit(priv: boolean = true) {
  return function(target: any, key: string) {
    let descriptor: PropertyDescriptor = {
      get() {
        if(store[this.yid]) {
          return store[this.yid][key];
        }
        return undefined;
      },
      set(newVal) {
        // if(priv && this) {
        //   // TODO: Check if the caller is the same as the owner class and if not prevent setting
        // }
        if(!store[this.yid]) {
          this.yid = this.constructor ? `${this.constructor.name}_${yidCounter++}`:`unknown_${yidCounter++}`;
          store[this.yid] = {};
        }
        store[this.yid][key] = `${newVal} stored!!!`;
      },
      enumerable: true,
      configurable: false
    }
    Object.defineProperty(target, key, descriptor);
  }
}

export function select(key) {
  return store[key];
}
