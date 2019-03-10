# yassi

Yet another simple store implementation

### Installation
npm install --save yassi

### TODO
1. Unopinionated store 
1. Store property by reference but retrieve a copy of it:
* There is no need to create getter on the property decorator
* Select of the property elsewhere must be a copy/snapshot of the prop's store and not the reference intself (to avoid changes)
* The snapshot should be deep copy (how deep?) 
1. Store should use weakMap (?) to store the values as is (i.e. not observable) and another weakMap to store the observalbes (not read only thus not behavioralSubject)
1. Maybe instead of observables you should create generators ???
1. Store property by using the property decorator ```yassit(<property name>)```
 This will store the property on each change under the given name
1. Retrieve the property from anywhere as read only by using the decorator ```getit(<propety name>)```
1. Components that get a property cannot change it
1. Only the component that create the property can change it
1. Should we use observable only or should we retrieve observable only if requested???
1. You can add a middleware by calling ```yassi.addMiddleware(<middlewareType>, function)```
1. The following middleware are available:
  * beforeStore
  * afterStore
  * beforeRetrieve
  * afterRetrieve
