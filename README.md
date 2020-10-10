# yassi

Yet Another Simple Store Implementation

## Overview
Yassi is a very simple javascript store implementation.  
Yassi keeps your store lean and mean while allowing data extensions via facades.  
Yassi store's properties have unique single owner thus reduce code complexity and maintenance.

While there are many stores out there storing your application state well enough such as redux, flux and others, they are all too cumbersome and opinionated.  
Using these libraries requires too much boilerplate.  
It is even recommended by top influential developers, such as Dan Abramov on his post [You might not need redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367), as well as by Redux [FAQ](https://redux.js.org/faq/general#when-should-i-use-redux) page to use these libraries only when your state become complex.
 
As Pete Hunt, one of the early contributors to React, says:

<h3><em>You'll know when you need Flux. If you aren't sure if you need it, you don't need it.</em></h3>

Similarly, Dan Abramov, one of the creators of Redux, says:

<h3><em>I would like to amend this: don't use Redux until you have problems with vanilla React.</em></h3>

In addition, redux, flux and others provide public access to all their properties from anyone that can access the store.  
In many cases and especially when the project grows, the result of such broad access behaviour is the manipulation of single application 
state's properties from multiple locations which increase code complexity and maintenance hassle.    

Yassi approach is different.  
<em><h4>It is so simple that you will want and should use it from your first line of code!!!</h4></em>   
It is publicly readable but privately writable which means everybody can access the property but **only the owner can change it**
 
Yassi key features are:
1. Unopinionated store - you don't need reducers or actions. Just mark the property you want to store with @yassit and you good to go
1. Don't want annotation? No problem, use the non annotated version of Yassi's operators.
1. Publicly readable - all properties in the store can be accessed by any consumer.
1. Privately writeable - only the owner of the property (i.e the class or object own the property) can apply changes to the property.
1. Lean and mean - with <em>facades</em> you may create store entries that cannot be changed directly and only changes as a reaction to store changes. 
This behaviour allowing you to keep the store as lean as possible.
1. Reactive store as well as not - You may get a property's value from the store using @select or use @observe to get a reactive observable on the given property
1. When needed, you may commiunicate with a property's owner via endpoints to execute some exported actions on the owner's properties
1. You can register any middleware to Yassi's operators, allowing you to create powerfull tools on top of Yassi.  
The following middleware are available:
  * beforeStore
  * afterStore
  * beforeRetrieve
  * afterRetrieve

**Check the Todo MVC example for Yassi with Angular**: [TodoMVC Yassi](https://github.com/KErez/todomvc-yassi-ng)

## Installation
npm install --save yassi

## Usage
* Import Yassi 
* Declare the properties that you like to store by add the `@yassit('propertyNameInStore')` before the declaration of the property or use it without annotation as follow - `yassit('propertyNameInStore', ownerObject, ownerPropertyName)`
* On another class, create a property and declare it with either `@select` or `@observe` to read the property from the store.

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
They are also publicly readable but privately writable which mean **_only instances of MyCoolClass can change them_** but everyone can read them  
Let's see how to use them in other component
```typescript
import {select} from 'yassi';

class AnotherComponent {
  prop1: string;
  
  @select('srcNumProp1')
  propFromStore: number;
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
  
  @observe('srcNumProp1') 
  propFromStore: Observable<number>;
}
``` 
Now any change to ```MyCoolClass.numProp1``` will reflect reactivly on ```AnotherComponent.propFromStore``` 

## Introducing Facades
One of the key concept of Yassi is to make the store lean and simple. To do so I created Yassi's Facades.

The idea of facades is to encourage users to use the store (via yassit) only for core data items and any 
 derived properties should come in the form of Facades. 
 
 In Yassi, properties are stored by the owner thus only the owner object may change their values. Facades are stored properties that does not 
  have an owner and therefore cannot change directly (to be precise, they have owner but it is privately owned by Yassi).
 
 Instead Facades listen to changes on one or more stored properties and triggers a function provided by the user on that changes to 
  create a new result from these stored properties 

Let's see how Facades works:

Assume we have the following class with its yassit:
```typescript
import {yassit} from 'yassi';

class ServerUserInfo {
  @yassit('firstName')
  firstName: string = 'John';
  
  @yassit('lastName')
  lastName: string = 'Doe';

  @yassit('birthDate')
  birthDate: number = 946677600000; 
}
```

If we want a full representation of the user info we should create facade instead of creating a new property owned by some object that can 
 be use everywhere
 
```typescript
import {yassi} from 'yassi';

yassi.facade('userInfo', ['firstName', 'lastName', 'birthDate'], ([fName, lName, bDate]) => {
  return {
    first: fName,
    last: lName,
    full: `${fName} ${lName}`,
    birth: new Date(bDate),
  }
});
```

Now the store has an entry `userInfo` which will hold the entire user info object but the beauty is that this entry is not changeable by 
 anyone, it can only change as a reaction to changes on the source properties it was declared on!!!
 
An example usage of that facade will be similar to any other stored property
```typescript
import {observe} from 'yassi';

class AnotherComponent {  
  @observe('userInfo') 
  myUserInfo: Observable<object>;

  printUserInfo() {
    this.myUserInfo.subscribe((userInfo: object) => {
      console.log(JSON.stringify(userInfo));
    })
  }
}
``` 

Any change to one of the properties in the store `firstName`, `lastName` or `birthDate` will trigger a print of the new version of `userInfo`

The return value from a faced will continue in the facade chain to any listener declared using `select` or `observe`.  
A user can control whether the facade will continue the chain or not by returning an object contains the `breakFacadeChain` operator and the `payload` operator as follow:  

```typescript
{
  breakFacadeChain: boolean,
  payload: any
}
``` 
If the `breakFacadeChain` is true, the chain will stop and the facade result will not continue to its listeners.  
If the `breakFacadeChain` is missing (`null` or `undefined`), the entire return value will be sent to the listeners.  
If the `breakFacadeChain` is false, the chain will continue and the facade will send the value of `payload` to the listeners.  

## Communicate with property's owner
As mentioned before, one of the key concept of Yassi is publicly readable/privately writable properties which mean that only the property's owner may alter the property.  
There are cases where one would like to change or request a change from outside (i.e. not from the owner) to a property that owned by other object.  
In this case Yassi introduce `yassi.communicate` which allows anyone in the system to request to communicate with the owner in some manner.  
How this communication will be done and what it will do is still in the control of the property's owner thus keeping the key concept of privately writable intact.  

#### How it is done
Declare endpoint function in the owner class/object with `@endpoint`.  
Note that the `@endpoint` functions must be declared after `@yassit` for the store to recognize it.  
Then call for `communicate()` with the owner's property name (this is how Yassi recognize the owner you want to communicate with), the endpoint name and array of arguments that will passed to endpoint.

Example:
```typescript
import {yassit, endpoint} from 'yassi';

class ServerUserInfo {
  @yassit('firstName')
  firstName: string = 'John';
  
  @yassit('lastName')
  lastName: string = 'Doe';

  @yassit('birthDate')
  birthDate: number = 946677600000;
  
  @yassit('userType')
  userType: string = 'visitor'; // Not an enum, I know. It is still an example only

  @endpoint()
  changeUserType(type: string, requester: any) {
    if (!authorizedUsers.get(requester)) {
      return;
    }
    if(type !== 'visitor' && type !== 'user') {
      return;
    }
    this.userType = type;
  }
}
```

And somewhere in the code you can request the endpoint from another component:  
```typescript
import {yassi} from yassi;

function someFunc() {
  // Do many things or not
  yassi.communicate('userType', 'changeUserType', ['user', currentUser]);  
}
```
The `communicate` function takes the following arguments:  
1. The owner's stored property name in which we like to communicate with (note it could be any other name declared on the owner such as `firstName`/`lastName`/`birthDate`).  
1. The name of the owner's endpoint that we like to execute meaning the name of the function declared by `@endpoint`.  
1. The expected arguments the function need as input.  

Note that the control of what is bean done is still at the hand of the owner. 
## API
* <strong>@yassit(name: string)</strong> - prefixed on a class's property that you like to add it's values to the store upon instantiation
* <strong>yassi.yassit(name: string, owner?: any, name?: string)</strong> - without annotation the `owner` and `name` are object and it's property in correspond that we like to store
* <strong>@select(name: string)</strong> - prefixed on a class's property when you want to get a store value of named property
* <strong>yassi.select(name: string, targetObj: object, targetProp: string)</strong> - without annotation, the targetObj and targetProp are object and it's property in correspond that we like to apply the store data on.
* <strong>@observe(name: string)</strong> - prefixed on a class's property when you want to observe a store propety via observable. You should subscribe to that observable to get any change in value.
* <strong>yassi.observe(name: string, targetObj: object, targetProp: string)</strong> - without annotation, the targetObj and targetProp are object and it's property in correspond that we like to apply the store data on reactively.  
* <strong>facade(name: string, yassiElementsName: string[], fn: (yassiElementsValue: any[]) => any)</strong> - The facade results will be stored in the store under the `name` entry and will execute the `fn` on each change on one of the stored values represented by `yassiElementsName`
* <strong>registerMiddleware(action: string, position: string, fn: (proto, key, val) => void = null)</strong> - Register a middleware function that will execute on the target action (either before or after it). Good place to execute loggers or monitoring tools.
* <strong>communicate(yassiPropName: string, endpointName: string, functionParams: any[])</strong> - execute an endpoint of name `endpointName` of the owner of `yassiPropName` with the given parameters.
 
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
1. Make ```@yassi``` work on different instances of a class. Right now it support only one instance of a class
1. Run benchmark against known stores
1. Add more examples
1. Add UI tools/extensions
