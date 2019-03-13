// tslint:disable:no-expression-statement
// tslint:exampleDecorator


import test from 'ava';

import {select, yassit} from './yassi';

// @ts-ignore
// class NoInstance {
//   @yassit('NoInstance.propNoUse')
//   propNoUse: number=5;
// }

class TestSource {
  @yassit('Test.srcNumProp1')
  numProp1: number;

  @yassit('Test.srcNumProp2')
  numProp2: number = 2;

  numProp3: number = 3;

  @yassit('Test.srcStringProp4')
  strProp4: string = 'hey there';
}

test('Simple instance with Yassi but works as without', (t) => {
  const test1 = new TestSource();
  t.is(test1.numProp1, undefined);
  t.is(test1.numProp2, 2);
  t.is(test1.numProp3, 3);
  t.is(test1.strProp4, 'hey there');
});

test("Simple Component A's number property is selected by Component B", (t) => {
  class TestDest {
    @select('Test.srcNumProp1') extProp1;
    @select('Test.srcNumProp2') extProp2;
    @select('Test.srcStringProp4') extProp3;

    myProp1: number = 10;
  }

  const test1 = new TestSource();
  const test2 = new TestDest();
  t.is(test1.numProp1, test2.extProp1);
  t.is(test1.numProp2, test2.extProp2);
  t.is(test1.numProp3, 3);
  t.is(test1.strProp4, test2.extProp3);
});
