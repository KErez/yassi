const store = new Map<any, any>();

class YassiPropertyDescriptor {
  name: string;
  writable: boolean;

  constructor(name, writable = false){
    this.name = name;
    this.writable = writable;
  }
}

/**
 * To make sure the property definition is on the instance and not on the class you need to define the property
 *  to override itself with another property definition.
 *  This way when the class is loaded the property definition is called and set a new setter definition
 *  Now each time an instance is called the setter is called and set a new setter and getter definition
 * Thanks to Romke Van Der Meulen - https://romkevandermeulen.nl/2018/01/24/typescript-property-decorators.html
 */
function overridePropertyDefinition(prototype: any, key: string, yassiDescriptor: YassiPropertyDescriptor) {
  // TODO: if yassiDescriptor.name is not valid or is already in store throw exception with possible reason i.e:
  //  'Property of such name already exists in the store. Maybe you should declare it on a shared component or service
	Object.defineProperty(prototype, key, {
		set(firstValue: any) {
			Object.defineProperty(this, key, {
				get() {
				  // TODO: remove this getter when you start to store by reference
					return store.get(yassiDescriptor.name);
				},
				set(value: any) {
				  if(yassiDescriptor.writable) {
				    // TODO: make the property writable from any place and not just from the owner
          }
				  store.set(yassiDescriptor.name, value);
				},
				enumerable: true,
			});
			this[key] = firstValue;
		},
		enumerable: true,
		configurable: true,
	});
}

// @ts-ignore
let yidCounter :number = 0; // yassi id counter
// yid -> yassi id
export function yassit(name: string) {
  if(!name || name.length <= 0) {
    throw new Error('You must provide property name when using yassit()');
  }
  // TODO: provide property descriptor from strategy class (i.e. allow different type of property storing
  return function(target: any, key: string) {
    overridePropertyDefinition(target, key, new YassiPropertyDescriptor(name));
  }
}

export function select(key) {
  // TODO: Change to copy the object when you start to store by reference
  // TODO: Also check the type before copy (for example string as immutable does not need to be cloned)
  return store.get(key);
}
