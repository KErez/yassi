# yassi

Yet Another Simple Store Implementation

## Overview
Yassi is a very simple javascript store implementation.  
Yassi keeps your store lean and mean while allowing data extensions via facades.  
Yassi encapsulate the data to avoid multiple data elements owners, thus reduce code complexity and maintenance.  

While there are many stores out there storing your application state well enough such as redux, flux and others, they are all too cumbersome and opinionated.  
Using these libraries requires too much boilerplate.  
It is even recommended by top influential developers as well as by Redux FAQ page to use these libraries only when your state become complex.
 
As Pete Hunt, one of the early contributors to React, says:

<h3><em>You'll know when you need Flux. If you aren't sure if you need it, you don't need it.</em></h3>

Similarly, Dan Abramov, one of the creators of Redux, says:

<h3><em>I would like to amend this: don't use Redux until you have problems with vanilla React.</em></h3>

In addition, redux, flux and others provide public access to all their properties from anyone that can access the store.  
In many cases and especially when the project grows, the result of such broad access behaviour is the editing of single application state properties from multiple locations which increase code complexity and maintenance hassle.    

Yassi approach is different.  
<em><h4>It is so simple that you will want and should use it from your first line of code!!!</h4></em>   
It is publicly readable but privately writable which means everybody can access the property but only the owner can change it
 
Yassi key features are:
1. Unopinionated store - you don't need reducers or actions. Just mark the property you want to store with @yassit and you good to go
1. Publicly readable - all properties in the store can be accessed by any consumer.
1. Privately writeable - only the owner of the property (i.e the class or object) may apply changes to the property.
1. Lean and mean - with <strong>facades</strong> you can extend the store data thus allowing you to keep the store as lean as possible.
1. Reactive store as well as not - You may get a property's value from the store using @select or use @observe to get a reactive observable on the given property
1. You can register any middleware to the storing process allowing you to create powerfull tools on top of Yassi.  
The following middleware are available:
  * beforeStore
  * afterStore
  * beforeRetrieve
  * afterRetrieve

##### Note
Yassi is still in alfa mode.

## Installation
npm install --save yassi

## Usage
* Import Yassi 
* Declare the properties that you like to store by add the @yassit('propertyNameInStore') before the declartion of the property
* On another class, create a property and declare it with either @select or @observe to read the property from the store.

```typescript
import {yassit} from 'yassi';

class MyCoolClass {
  @yassit('srcNumProp1')
    numProp1: number;
  
  @yassit('srcNumProp2')
    numProp2: number = 2;
}
```
That's it, These properties are stored on class instantiation!!!
They are also publicly readable which mean **_only instances of MyCoolClass can change them_** but everyone can read them  
Let's see how to use them in other component
```typescript
import {select} from 'yassi';

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
import {observe} from 'yassi';

class AnotherComponent {
  prop1: string;
  
  @observe('srcNumProp1') propFromStore: Observable<number>;
}
``` 
Now any change to ```MyCoolClass.numProp1``` will reflect reactivly on ```AnotherComponent.propFromStore``` 

## API
* <strong>@yassit(name: string)</strong> - prefixed on a class's property that you like to add it's values to the store upon instantiation  
* <strong>@select(name: string)</strong> - prefixed on a class's property when you want to get a store value of named property  
* <strong>@observe(name: string)</strong> - prefixed on a class's property when you want to observe a store propety via observable. You should subscribe to that observable to get any change in value.  
* <strong>yassiStore.touch</strong> - call it when you change a source property that has observers and you want the value to dispatch to them. For example you have a `user` object that you observe and you have change the user.name. At this moment it will not trigger the observable so you need to call `touch` (this will be changed in comming releases)  
* <strong>yassiStore.update(key: string, value: any)</strong> - Another way to update a stored object/property while making sure that any observer will be notified without the need to call yassiStore.touch. Update is equal to `user.name="changed name"` + `touch`

## Middlewares
You can register middleware functions that will be triggered synchronously before/after the yassi decorator apply
* You can register the default middleware (i.e. print action to console) by simply call registerMiddleware without callback. 
Example:
```typescript
import {registerMiddleware} from 'yassi';

registerMiddleware('yassit', 'before');
// Instantiation of MyCoolClass as well as updates to its properties will print the properties to the console.
const myClass = new MyCoolClass();
```

* You may provide a call back function to registerMiddleware that will execute every time the decorator is run
Example:
```typescript
import {registerMiddleware} from 'yassi';

registerMiddleware('yassit', 'after',
    (proto: any, key: string, val: any) => console.log(`-------${proto.constructor.name}.${key}=${val}-------`));
// Instantiation of MyCoolClass will trigger the given callback calls to the console.
const myClass = new MyCoolClass();
```

You can register any amount of middlewares for yassit, select and observe before and/or after it.

## To Do
1. Reduce the need of touch and update in most cases - provide a Proxy for objects so each property change will trigger the store (on first level only) 
1. Make ```@yassi``` work on different instances of a class. Right now it support only one instance of a class
1. Export the store and yassi via single api file (index.ts may suffice)
1. Run benchmark against known stores
1. Add more examples
1. Add UI tools/extensions
