// tslint:disable:no-expression-statement
// tslint:exampleDecorator

import test from 'ava';
import { exampleDecorator, storeit } from './yassi';

class Test {
  @exampleDecorator(2)
  myProp1:number;

  @exampleDecorator(3)
  myProp2: number = 2;

  myProp3:number = 3;

  @storeit()
  storeProp1:string = 'hey there';
}

test('exampleDecorator', t => {
  const test = new Test();
  t.is(test.myProp1, undefined);
  t.is(test.myProp2, 6);
  t.is(test.myProp3, 3);
});

test( 'store test', t => {
  const test = new Test();
  t.is(test.storeProp1, 'hey there stored!!!');
});

test( 'store test multiple', t => {
  const test1 = new Test();
  const test2:any = new Test();
  test2.storeProp1 = 'This is another prop value';
  t.is(test1.storeProp1, 'hey there stored!!!');
  t.is(test2.storeProp1, 'This is another prop value stored!!!');
});

test( 'store test multiple2', t => {
  const test2:any = new Test();
  test2.myProp1 = 6;
  t.is(test2.yid, 'bla2');
});

test( 'store test multiple3', t => {
  const test1:any = new Test();
  const test2:any = new Test();
  test2.myProp1 = 6;
  t.is(test1.yid, 'bla1');
});