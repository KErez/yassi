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
  @yassit('TestSource.srcNumProp1')
  numProp1: number;

  @yassit('TestSource.srcNumProp2')
  numProp2: number = 2;

  numProp3: number = 3;

  @yassit('TestSource.srcStringProp4')
  strProp4: string = 'hey there';
}

test('object instance with Yassi but works as without', (t) => {
  const test1 = new TestSource();
  t.is(test1.numProp1, undefined);
  t.is(test1.numProp2, 2);
  t.is(test1.numProp3, 3);
  t.is(test1.strProp4, 'hey there');
});

test("object A's property is selected by object B", (t) => {
  class TestDest {
    @select('TestSource.srcNumProp1') extProp1;
    @select('TestSource.srcNumProp2') extProp2;
    @select('TestSource.srcStringProp4') extProp3;

    myProp1: number = 10;
  }

  const test1 = new TestSource();
  const test2 = new TestDest();
  t.is(test1.numProp1, test2.extProp1);
  t.is(test1.numProp2, test2.extProp2);
  t.is(test1.numProp3, 3);
  t.is(test1.strProp4, test2.extProp3);
});

test('select property that does not exists in the store and expect undefined follow js behaviour',(t) => {
  class TestDest {
    @select('NoKeyFound') notFoundProp;
    @select('TestSource.srcNumProp1') prop1;
  }

  const test1 = new TestSource();
  const test2 = new TestDest();
  t.is(test1.numProp1, test2.prop1);
  t.is(test2.notFoundProp, undefined);
});

test("select A's property from obj B, change it and read it again. Expect to see the change", (t) => {
  class TestDest1 {
    @select('TestSource.srcNumProp1') prop1;
  }

  const test1 = new TestSource();
  const test2 = new TestDest1();
  t.is(test1.numProp1, test2.prop1);
  test1.numProp1 = 1000;
  t.is(test2.prop1, 1000);
});
