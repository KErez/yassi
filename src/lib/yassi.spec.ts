// tslint:disable:no-expression-statement
// tslint:exampleDecorator


import test from 'ava';

import {observe, select, yassit} from './yassi';

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

  @yassit('TestSource.srcObjProp5')
  objProp5: any = {
    msg: 'this is a property in object'
  }
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

test('select property that does not exists in the store and expect undefined follow js behaviour', (t) => {
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

test('change to a selected property throw error', (t) => {
  class TestDest {
    @select('TestSource.srcNumProp2') prop2;
  }

  // @ts-ignore
  const test2 = new TestDest();
  t.is(test2.prop2, 2);
  try {
    test2.prop2 = 1000;
  } catch (e) {
    t.is(e.message, 'Cannot set property prop2 of #<TestDest> which has only a getter');
  }
  t.is(test2.prop2, 2);
});

test("yassit A's property of type object and read it on object B", (t) => {
  class TestDest {
    @select('TestSource.srcObjProp5') prop5;
  }

  const test1 = new TestSource();
  const test2 = new TestDest();
  t.is(test1.objProp5, test2.prop5);
});

test("yassit A's property of type object is by reference", (t) => {
  class TestDest {
    @select('TestSource.srcObjProp5') prop5;
  }

  const test1 = new TestSource();
  const test2 = new TestDest();
  t.is(test1.objProp5, test2.prop5);
  test1.objProp5.anotherProp = 'Another new obj';
  t.is(test2.prop5.anotherProp, 'Another new obj');
  test2.prop5.propFromSelected = 'Prop from selected';
  t.is(test1.objProp5.propFromSelected, 'Prop from selected')
});

test("change selected property of type object throw error", (t) => {
  class TestDest {
    @select('TestSource.srcObjProp5') prop5;
  }

  const test1 = new TestSource();
  const test2 = new TestDest();
  t.is(test1.objProp5, test2.prop5);
  test1.objProp5.anotherProp = 'Another new obj';
  t.is(test2.prop5.anotherProp, 'Another new obj');
  try {
    test2.prop5 = {
      msg: 'message in another object. Throw exception'
    }
  } catch (e) {
    t.is(e.message, 'Cannot set property prop5 of #<TestDest> which has only a getter');
  }
});

test('observe a store property using @observe and get the pushed values immediatly', (t) => {
  class TestDest {
    @observe('TestSource.srcNumProp2') prop2;
  }

  const test1 = new TestSource();
  const test2 = new TestDest();
  const sink = [];
  t.not(test1.numProp2, test2.prop2);
  test2.prop2.subscribe((val) => {
    sink.push(val);
  });
  test1.numProp2 = 10;
  test1.numProp2 = 50;
  test1.numProp2 = 80;
  t.deepEqual(sink, [2, 10, 50, 80]);
  t.is(test2.prop2.value, 80);
});
