// tslint:disable:no-expression-statement
// tslint:exampleDecorator


import test from 'ava';

import {yassit} from './yassi';

// @ts-ignore
// class NoInstance {
//   @yassit('NoInstance.propNoUse')
//   propNoUse: number=5;
// }

class TestSource {
  @yassit('Test.myProp1')
  myProp1:number;

  @yassit('Test.myProp2')
  myProp2: number = 2;

  myProp3:number = 3;

  @yassit('Test.storeProp1')
  storeProp1:string = 'hey there';

  constructor() {
    console.log('do nothing');
  }
}

test('simple yassit store', t => {
  const test1 = new TestSource();
  t.is(test1.myProp1, undefined);
  t.is(test1.myProp2, 2);
  t.is(test1.myProp3, 3);
});
