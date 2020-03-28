# yassi

Yet Another Simple Store Implementation

## Overview
Yassi is a very simple javascript store implementation.
While there are many stores out there that do the job well of storing you state such as redux, flux and others, they are all too cumbersome and opinionated.
 Using these libraries requires too much boilerplate. It is not rare to find many developers recommend to start a project without a redux store and move to it only when you app state becomes complex.

Yassi approach is different. It is so simple that you will want to use it from your first line of code.
 Thus Yassi is:
1. Unopinionated store - you don't need reducers or actions. Just mark the property you want to store with @yassit and you good to go
1. Reactive store as well as not - You may get a reference to a property from the store using @select or use @observe to get a reactive observalbe on the given property
1. You can register any middleware to the storing process allowing you to create powerfull tools on top of Yassi
1. The following middleware are available:
  * beforeStore
  * afterStore
  * beforeRetrieve
  * afterRetrieve

##### Note
Yassi is still in alfa mode.

## Installation
npm install --save yassi

## Usage
* First you import Yassi and declare all your properties that you like to store in a store.  
that gives you total freedom to store all your properties or just the one that you share with other components.
* Just add the @yassi('propertyNameInStore') before the declartion of the property

```typescript
import {yassiStore} from "./store";
import {observe, registerMiddleware, select, yassit} from './yassi';

class MyCoolClass {
  @yassit('srcNumProp1')
    numProp1: number;
  
  @yassit('srcNumProp2')
    numProp2: number = 2;
}
```
**_That's it, These properties are stored on class instantiation!!!_** 
Let's see how to use them in other component
```typescript
class AnotherComponent {
  prop1: string;
  
  @select('srcNumProp1') propFromStore: number;
}
``` 
Again, that's it!!!
Any change to ```MyCoolClass.numProp1``` will reflect on ```AnotherComponent.propFromStore```.
Note that ```AnotherComponent.propFromStore``` is a read only property and you cannot change it here, only via ```MyCoolClass```

Want reactive??! 
Use ```@observe``` instead of ```@select```
```typescript
class AnotherComponent {
  prop1: string;
  
  @observe('srcNumProp1') propFromStore: Observable<number>;
}
``` 
Now any change to ```MyCoolClass.numProp1``` will reflect reactivly on ```AnotherComponent.propFromStore``` 

## API
@yassit(name: string) - prefixed on a class's property that you like to add it's values to the store upon instantiation
@select(name: string) - prefixed on a class's property when you want to get a store value of named property
@observe(name: string) - prefixed on a class's property when you want to observe a store propety via observable. You should subscribe to that observable to get any change in value.
yassiStore.touch - call it when you change a source property that has observers and you want the value to dispatch to them
yassiStore.update(key: string, value: any) - Another way to update a stored object/property while making sure that any observer will be notified without the need to call yassiStore.touch

## Middlewares
You can register middleware functions that will be triggered synchronously before/after the yassi decorator apply
* You can register the default middleware (i.e. print action to console) by simply call registerMiddleware without callback. 
Example:
```typescript
registerMiddleware('yassit', 'before');
// Instantiation of MyCoolClass will print the @yassit calls to the console.
cosnt myClass = new MyCoolClass();
```

* You may provide a call back function to registerMiddleware that will execute every time the decorator is run
Example:
```typescript
registerMiddleware('yassit', 'after',
    (proto: any, key: string, val: any) => console.log(`-------${proto.constructor.name}.${key}=${val}-------`));
// Instantiation of MyCoolClass will trigger the given callback calls to the console.
cosnt myClass = new MyCoolClass();
```

You can register any amount of middlewares for yassit, select and observe before and/or after it.

## To Do
1. Make ```@yassi``` work on different instances of a class. Right now it support only one instance of a class
1. Export the store and yassi via single api file (index.ts may suffice)
1. Check other solutions to avoid the use of yassiStore.touch and/or update
1. Run benchmark against known stores
1. Add more examples
1. Add UI tools/extensions

