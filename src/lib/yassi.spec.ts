// tslint:disable:no-expression-statement
// tslint:exampleDecorator


import test from 'ava';
import {BehaviorSubject} from "rxjs";

import {yassiStore} from "./store";
import {observe, registerMiddleware, select, yassit} from './yassi';

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
  strProp4: string = 'Not Again';

  @yassit('TestSource.srcObjProp5')
  objProp5: any = {
    msg: 'this is a property in object'
  };

  @yassit('TestSource.srcAsyncNumProp6')
  asyncProp6: number = 42;

  @yassit('TestSource.srcAsyncNumProp7')
  asyncProp7: number = 314;

  @yassit('TestSource.srcAsyncObjProp8')
  asyncProp8: any;

  @yassit('TestSource.srcAsyncObjProp9')
  asyncProp9: any = {prop1: 1, prop2: 2};

  @yassit('TestSource.srcAsyncObjProp10')
  asyncProp10: any;

  @yassit('TestSource.srcAsyncObjProp11')
  asyncProp11: any;

  @yassit('TestSource.srcArrayProp12')
  arrayProp12: any[];


  changeProp6Async() {
    let promise = new Promise((resolve) => {
      setTimeout(() => {
        this.asyncProp6 = 345;
        resolve();
      }, 200);
    });
    return promise;
  }

  changeProp7Async() {
    setTimeout(() => this.asyncProp7 = 1414, 200);
  }
}

test('object instance with Yassi but works as without', (t) => {
  const test1 = new TestSource();
  t.is(test1.numProp1, undefined);
  t.is(test1.numProp2, 2);
  t.is(test1.numProp3, 3);
  t.is(test1.strProp4, 'Not Again');
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

test("select A's property from obj B, change it on A and read it again on B. Expect to see the change", (t) => {
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
});

test("change A's property asynchronously and read the change", async (t) => {
  class TestDest {
    @select('TestSource.srcAsyncNumProp6') prop6;
  }

  const test1 = new TestSource();
  const test2 = new TestDest();
  t.is(test2.prop6, 42);
  await test1.changeProp6Async();
  t.is(test2.prop6, 345);
});

test('yassit on existing entry name throw exception', (t) => {
  try {
    // @ts-ignore
    class TesetDest {
      @yassit('TestSource.srcNumProp2') illegalPropDecorator;
    }
  } catch (e) {
    t.is(e.message, 'Store already has entry with name TestSource.srcNumProp2');
  }
});

test('observe an array changes', (t) => {
  class TestDest {
    @observe('TestSource.srcArrayProp12') prop12;
  }

  const test1 = new TestSource();
  const test2 = new TestDest();
  const expectedValues = [undefined, [1], [1,2]];
  let v = new BehaviorSubject<any>(null);
  test2.prop12.subscribe((val: any[]) => {
    t.deepEqual(val, expectedValues.shift());
    if (expectedValues.length === 0) {
      v.complete();
    }
  });
  test1.arrayProp12 = [];
  test1.arrayProp12.push(1);
  test1.arrayProp12.push(2);
  return v;
});

test('observe object were its property changes', (t) => {
  class TestDest {
    @observe('TestSource.srcAsyncObjProp8') prop8;
  }

  const test1 = new TestSource();
  const test2 = new TestDest();

  const expectedVals = [undefined, {inner1: 5}, {inner1: 8}];
  let v = new BehaviorSubject<any>(null);
  test2.prop8.subscribe((val) => {
    t.deepEqual(val, expectedVals.shift());
    if (expectedVals.length === 0) {
      v.complete();
    }
  });
  test1.asyncProp8 = {
    inner1: 5
  };
  test1.asyncProp8.inner1 = 8;
  return v;
});


test('Change an initialized observed object', (t) => {
  class TestDest {
    @observe('TestSource.srcAsyncObjProp9') prop9;
  }

  const test1 = new TestSource();
  const test2 = new TestDest();

  const expectedVals = [
    {prop1: 1, prop2: 2},
    {prop3: 'other'},
    {prop4: 42},
  ];
  let v = new BehaviorSubject<any>(null);
  setTimeout(() => {
    test2.prop9.subscribe((val) => {
      t.deepEqual(val, expectedVals.shift());
      if (expectedVals.length === 0) {
        v.complete();
      }
    });
    test1.asyncProp9 = {
      prop3: 'other'
    };
    test1.asyncProp9 = {
      prop4: 42
    };
  },10);
  return v;
});

test('Change an uninitialized observed object', (t) => {
  class TestDest {
    @observe('TestSource.srcAsyncObjProp10') prop10;
  }

  const test1 = new TestSource();
  const test2 = new TestDest();

  const expectedVals = [
    undefined,
    {prop1: 'bla'},
    {prop3: 'other'},
    {prop4: 42},
  ];
  let v = new BehaviorSubject<any>(null);
  test2.prop10.subscribe((val) => {
    t.deepEqual(val, expectedVals.shift());
    if (expectedVals.length === 0) {
      v.complete();
    }
  });
  test1.asyncProp10 = {
    prop1: 'bla'
  };
  test1.asyncProp10 = {
    prop3: 'other'
  };
  test1.asyncProp10 = {
    prop4: 42
  };
  return v;
});

test('Use update to change a stored element', (t) => {
  class TestDest {
    @observe('TestSource.srcAsyncObjProp11') prop11;
  }

  const test1 = new TestSource();
  const test2 = new TestDest();

  const expectedVals = [
    undefined,
    {prop1: 'bla'},
    {prop3: 'other'},
    {prop4: 42},
  ];
  let v = new BehaviorSubject<any>(null);
  setTimeout(() => {
    test2.prop11.subscribe((val) => {
      t.deepEqual(val, expectedVals.shift());
      if (expectedVals.length === 0) {
        v.complete();
      }
    });
    test1.asyncProp11 = {
      prop1: 'bla'
    };
    yassiStore.update('TestSource.srcAsyncObjProp11', {prop3: 'other'});
    yassiStore.update('TestSource.srcAsyncObjProp11', {prop4: 42});
  },10);

  return v;
});

test('registerMiddleware for before yassit', (t) => {
  registerMiddleware('yassit', 'before');
  const test1 = new TestSource();
  t.is(test1.numProp2, 2);
  test1.numProp2 = 444;
  t.log('We should see the number 444 printed to console.');
});

test('register middleware for after yassit', (t) => {
  registerMiddleware('yassit', 'after',
    (proto: any, key: string, val: any) => console.log(`-------${proto.constructor.name}.${key}=${val}-------`));
  const test1 = new TestSource();
  test1.numProp3 = 1234;
  t.is(test1.numProp3, 1234);
});
