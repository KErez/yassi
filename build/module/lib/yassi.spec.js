// tslint:disable:no-expression-statement
// tslint:exampleDecorator
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { serial as test } from 'ava';
import { BehaviorSubject, Observable } from 'rxjs';
import { endpoint, observe, registerMiddleware, select, yassi, yassit } from './exportedApi';
import { yassiStore } from './store';
// @ts-ignore
// class NoInstance {
//   @yassit('NoInstance.propNoUse')
//   propNoUse: number=5;
// }
class TestSource {
    constructor() {
        this.numProp2 = 2;
        this.numProp3 = 3;
        this.strProp4 = 'Not Again';
        this.objProp5 = {
            msg: 'this is a property in object'
        };
        this.asyncProp6 = 42;
        this.asyncProp7 = 314;
        this.asyncProp9 = { prop1: 1, prop2: 2 };
        this.facadeProp15 = {
            first: 'Kfir',
            last: 'Erez',
            birthYear: 1975
        };
        this.apiSource16 = 'Restricted area';
        this.arraySource17 = [{
                count: 0,
            }];
        this.apiSource18 = 'Restricted area';
        this.arrayProp19 = [1, 2, 3];
        this.objectProp20 = {
            a: 1,
            b: 2,
        };
        this.objectProp21 = {
            getIt: true,
        };
    }
    change16Empty() {
        this.apiSource16 = 'Empty parameters';
    }
    change16(inRequest16) {
        this.apiSource16 = inRequest16.replace('requested', 'granted');
    }
    change16Multiple(inRequest16, param2, param3) {
        const res = `${inRequest16.replace('requested', 'granted')} -> ${param2} -> ${param3}`;
        this.apiSource16 = res;
    }
    change18(inReq18, param2, param3) {
        const res = `${inReq18.replace('requested', 'granted')} -> ${param2} -> ${param3}`;
        this.apiSource18 = res;
    }
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
__decorate([
    yassit('TestSource.srcNumProp1'),
    __metadata("design:type", Number)
], TestSource.prototype, "numProp1", void 0);
__decorate([
    yassit('TestSource.srcNumProp2'),
    __metadata("design:type", Number)
], TestSource.prototype, "numProp2", void 0);
__decorate([
    yassit('TestSource.srcStringProp4'),
    __metadata("design:type", String)
], TestSource.prototype, "strProp4", void 0);
__decorate([
    yassit('TestSource.srcObjProp5'),
    __metadata("design:type", Object)
], TestSource.prototype, "objProp5", void 0);
__decorate([
    yassit('TestSource.srcAsyncNumProp6'),
    __metadata("design:type", Number)
], TestSource.prototype, "asyncProp6", void 0);
__decorate([
    yassit('TestSource.srcAsyncNumProp7'),
    __metadata("design:type", Number)
], TestSource.prototype, "asyncProp7", void 0);
__decorate([
    yassit('TestSource.srcAsyncObjProp8'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp8", void 0);
__decorate([
    yassit('TestSource.srcAsyncObjProp9'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp9", void 0);
__decorate([
    yassit('TestSource.srcAsyncObjProp10'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp10", void 0);
__decorate([
    yassit('TestSource.srcAsyncObjProp11'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp11", void 0);
__decorate([
    yassit('TestSource.srcArrayProp12'),
    __metadata("design:type", Array)
], TestSource.prototype, "arrayProp12", void 0);
__decorate([
    yassit('TestSource.facadeSource15'),
    __metadata("design:type", Object)
], TestSource.prototype, "facadeProp15", void 0);
__decorate([
    yassit('TestSource.apiSource16'),
    __metadata("design:type", String)
], TestSource.prototype, "apiSource16", void 0);
__decorate([
    yassit('TestSource.markToUpdate17'),
    __metadata("design:type", Array)
], TestSource.prototype, "arraySource17", void 0);
__decorate([
    yassit('TestSource.apiSource18'),
    __metadata("design:type", String)
], TestSource.prototype, "apiSource18", void 0);
__decorate([
    yassit('TestSource.arraySource19'),
    __metadata("design:type", Array)
], TestSource.prototype, "arrayProp19", void 0);
__decorate([
    yassit('TestSource.objectSource20'),
    __metadata("design:type", Object)
], TestSource.prototype, "objectProp20", void 0);
__decorate([
    yassit('TestSource.objectSource21'),
    __metadata("design:type", Object)
], TestSource.prototype, "objectProp21", void 0);
__decorate([
    yassit('TestSource.srcBoolLikeProp22'),
    __metadata("design:type", Object)
], TestSource.prototype, "boolLikeProp22", void 0);
__decorate([
    endpoint(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestSource.prototype, "change16Empty", null);
__decorate([
    endpoint(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TestSource.prototype, "change16", null);
__decorate([
    endpoint(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TestSource.prototype, "change16Multiple", null);
__decorate([
    endpoint(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TestSource.prototype, "change18", null);
test('object instance with Yassi but works as without', (t) => {
    const test1 = new TestSource();
    t.is(test1.numProp1, undefined);
    t.is(test1.numProp2, 2);
    t.is(test1.numProp3, 3);
    t.is(test1.strProp4, 'Not Again');
});
test("object A's property is selected by object B", (t) => {
    class TestDest {
        constructor() {
            this.myProp1 = 10;
        }
    }
    __decorate([
        select('TestSource.srcNumProp1'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "extProp1", void 0);
    __decorate([
        select('TestSource.srcNumProp2'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "extProp2", void 0);
    __decorate([
        select('TestSource.srcStringProp4'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "extProp3", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test1.numProp1, test2.extProp1);
    t.is(test1.numProp2, test2.extProp2);
    t.is(test1.numProp3, 3);
    t.is(test1.strProp4, test2.extProp3);
});
test('select property that does not exists in the store and expect undefined follow js behaviour', (t) => {
    class TestDest {
    }
    __decorate([
        select('NoKeyFound'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "notFoundProp", void 0);
    __decorate([
        select('TestSource.srcNumProp1'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop1", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test1.numProp1, test2.prop1);
    t.is(test2.notFoundProp, undefined);
});
test("select A's property from obj B, change it on A and read it again on B. Expect to see the change", (t) => {
    class TestDest1 {
    }
    __decorate([
        select('TestSource.srcNumProp1'),
        __metadata("design:type", Object)
    ], TestDest1.prototype, "prop1", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest1();
    t.is(test1.numProp1, test2.prop1);
    test1.numProp1 = 1000;
    t.is(test2.prop1, 1000);
});
test('change to a selected property throw error', (t) => {
    class TestDest {
    }
    __decorate([
        select('TestSource.srcNumProp2'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop2", void 0);
    // @ts-ignore
    const test2 = new TestDest();
    t.is(test2.prop2, 2);
    try {
        test2.prop2 = 1000;
    }
    catch (e) {
        t.is(e.message, 'Cannot set property prop2 of #<TestDest> which has only a getter');
    }
    t.is(test2.prop2, 2);
});
test("yassit A's property of type object and read it on object B", (t) => {
    class TestDest {
    }
    __decorate([
        select('TestSource.srcObjProp5'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop5", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test1.objProp5, test2.prop5);
});
test("yassit A's property of type object is by reference", (t) => {
    class TestDest {
    }
    __decorate([
        select('TestSource.srcObjProp5'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop5", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test1.objProp5, test2.prop5);
    test1.objProp5.anotherProp = 'Another new obj';
    t.is(test2.prop5.anotherProp, 'Another new obj');
    test2.prop5.propFromSelected = 'Prop from selected';
    t.is(test1.objProp5.propFromSelected, 'Prop from selected');
});
test("change selected property of type object throw error", (t) => {
    class TestDest {
    }
    __decorate([
        select('TestSource.srcObjProp5'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop5", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test1.objProp5, test2.prop5);
    test1.objProp5.anotherProp = 'Another new obj';
    t.is(test2.prop5.anotherProp, 'Another new obj');
    try {
        test2.prop5 = {
            msg: 'message in another object. Throw exception'
        };
    }
    catch (e) {
        t.is(e.message, 'Cannot set property prop5 of #<TestDest> which has only a getter');
    }
});
test('observe a store property using @observe and get the pushed values immediatly', (t) => {
    class TestDest {
    }
    __decorate([
        observe('TestSource.srcNumProp2'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop2", void 0);
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
    }
    __decorate([
        select('TestSource.srcAsyncNumProp6'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop6", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test2.prop6, 42);
    await test1.changeProp6Async();
    t.is(test2.prop6, 345);
});
// test.only('yassit on existing entry name throw exception', (t) => {
//   // @ts-ignore
//   class TesetDest {
//     @yassit('TestSource.srcNumProp2') illegalPropDecorator;
//   }
//   // t.is(e.message, 'Store already has an active entry with name TestSource.srcNumProp2');
// });
test('observe an array changes', (t) => {
    class TestDest {
    }
    __decorate([
        observe('TestSource.srcArrayProp12'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop12", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedValues = [undefined, [], [1], [1, 2]];
    let v = new BehaviorSubject(null);
    test2.prop12.subscribe((val) => {
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
    }
    __decorate([
        observe('TestSource.srcAsyncObjProp8'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop8", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [undefined, { inner1: 5 }, { inner1: 8 }];
    let v = new BehaviorSubject(null);
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
    }
    __decorate([
        observe('TestSource.srcAsyncObjProp9'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop9", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [
        { prop1: 1, prop2: 2 },
        { prop3: 'other' },
        { prop4: 42 },
    ];
    let v = new BehaviorSubject(null);
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
    }, 10);
    return v;
});
test('Change an uninitialized observed object', (t) => {
    class TestDest {
    }
    __decorate([
        observe('TestSource.srcAsyncObjProp10'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop10", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [
        undefined,
        { prop1: 'bla' },
        { prop3: 'other' },
        { prop4: 42 },
    ];
    let v = new BehaviorSubject(null);
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
test("Change object's properties and observe them", (t) => {
    class TestDest {
    }
    __decorate([
        observe('TestSource.srcAsyncObjProp11'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop11", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [
        undefined,
        { prop1: 'bla' },
        { prop1: 'changed' },
        { prop1: 'changed', prop3: 'other' },
        { prop1: 'changed', prop3: 'other', prop4: 42 },
    ];
    let v = new BehaviorSubject(null);
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
        test1.asyncProp11.prop1 = 'changed';
        test1.asyncProp11.prop3 = 'other';
        test1.asyncProp11.prop4 = 42;
    }, 10);
    return v;
});
test('No annotations yassit and observe', (t) => {
    class TestDest {
    }
    const test1 = new TestSource();
    const test2 = new TestDest();
    yassi.yassit('TestSource.noAnnotationProp13', test1, 'noAnnotationProp13');
    yassi.observe('TestSource.noAnnotationProp13', test2, 'prop13');
    const expectedVals = [
        undefined,
        { prop1: 'bla' },
        { prop1: 'changed' },
        { prop1: 'changed', prop3: 'other' },
        { prop1: 'changed', prop3: 'other', prop4: 42 },
    ];
    let v = new BehaviorSubject(null);
    setTimeout(() => {
        test2.prop13.subscribe((val) => {
            t.deepEqual(val, expectedVals.shift());
            if (expectedVals.length === 0) {
                v.complete();
            }
        });
        test1.noAnnotationProp13 = {
            prop1: 'bla'
        };
        test1.noAnnotationProp13.prop1 = 'changed';
        test1.noAnnotationProp13.prop3 = 'other';
        test1.noAnnotationProp13.prop4 = 42;
    }, 10);
    return v;
});
test('yassit on an old js object without class and annotations', (t) => {
    function TestDest() {
        this.prop14 = undefined;
    }
    const test1 = new TestSource();
    const test2 = new TestDest();
    yassi.yassit('TestSource.oldJSObjectProp14', test1, 'oldJSObjectProp14');
    yassi.observe('TestSource.oldJSObjectProp14', test2, 'prop14');
    const expectedVals = [
        undefined,
        { prop1: 'bla' },
        { prop1: 'changed' },
        { prop1: 'changed', prop3: 'other' },
        { prop1: 'changed', prop3: 'other', prop4: 42 },
    ];
    let v = new BehaviorSubject(null);
    setTimeout(() => {
        test2.prop14.subscribe((val) => {
            t.deepEqual(val, expectedVals.shift());
            if (expectedVals.length === 0) {
                v.complete();
            }
        });
        test1.oldJSObjectProp14 = {
            prop1: 'bla'
        };
        test1.oldJSObjectProp14.prop1 = 'changed';
        test1.oldJSObjectProp14.prop3 = 'other';
        test1.oldJSObjectProp14.prop4 = 42;
    }, 10);
    return v;
});
test('create a facade on top of stored element', (t) => {
    yassi.facade('facadeDest_fullName', ['TestSource.facadeSource15'], ([userObj]) => {
        if (!userObj) {
            return null;
        }
        return `${userObj.first} ${userObj.last}`;
    });
    t.is(yassiStore.has('TestSource.facadeSource15'), true);
    t.is(yassiStore.has('facadeDest_fullName'), true);
    class TestDest {
    }
    __decorate([
        observe('facadeDest_fullName'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "fullNameProp15", void 0);
    // @ts-ignore
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [
        'Kfir Erez',
    ];
    let v = new BehaviorSubject(null);
    setTimeout(() => {
        test2.fullNameProp15.subscribe((fullName) => {
            const val = expectedVals.shift();
            t.is(fullName, val);
            if (expectedVals.length === 0) {
                v.complete();
            }
        });
    }, 0);
    return v;
});
test('markToUpdate a property that deeply changed', (t) => {
    class TestDest {
    }
    __decorate([
        observe('TestSource.markToUpdate17'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "markToUpdate$", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [
        [{ count: 0 }],
        [{ count: 2 }],
    ];
    let v = new BehaviorSubject(null);
    test2.markToUpdate$.subscribe((items) => {
        const val = expectedVals.shift();
        t.deepEqual(items, val);
        if (expectedVals.length === 0) {
            v.complete();
        }
    });
    // This will not trigger change
    test1.arraySource17[0].count = 1;
    test1.arraySource17[0].count = 2;
    yassi.republish('TestSource.markToUpdate17');
    return v;
});
test('Fail to create facade with invalid characters', (t) => {
    try {
        yassi.facade('1facadeDest.fullName', ['TestSource.facadeSource15'], ([userObj]) => {
            return `${userObj.first} ${userObj.last}`;
        });
    }
    catch (e) {
        t.is(e.message, 'You must provide valid yassiPropertyName');
    }
    try {
        yassi.facade('facadeDest.fullName', ['TestSource.facadeSource15'], ([userObj]) => {
            return `${userObj.first} ${userObj.last}`;
        });
    }
    catch (e) {
        t.is(e.message, 'You must provide valid name and yassiElementsName when using facade');
    }
});
test('Interact with property owner via castRequest', (t) => {
    class TestDest {
    }
    __decorate([
        observe('TestSource.apiSource16'),
        __metadata("design:type", Observable)
    ], TestDest.prototype, "apiDest16", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [
        'Restricted area',
        'Empty parameters',
        'Changed from owner',
        'change on api request - granted',
        'Changed from owner',
        'change on api request - granted -> yassi -> awesome',
    ];
    const v = new BehaviorSubject(null);
    test2.apiDest16
        .subscribe((propVal) => {
        const val = expectedVals.shift();
        t.is(propVal, val);
        if (expectedVals.length === 0) {
            // subscription.unsubscribe();
            v.complete();
        }
    });
    yassi.castRequest('TestSource.apiSource16', 'change16Empty');
    test1.apiSource16 = 'Changed from owner';
    yassi.castRequest('TestSource.apiSource16', 'change16', 'change on api request - requested');
    test1.apiSource16 = 'Changed from owner';
    yassi.castRequest('TestSource.apiSource16', 'change16Multiple', 'change on api request - requested', 'yassi', 'awesome');
    return v;
});
test('Interact with property owner via older communicate version', (t) => {
    class TestDest {
    }
    __decorate([
        observe('TestSource.apiSource18'),
        __metadata("design:type", Observable)
    ], TestDest.prototype, "apiDest18", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [
        'Restricted area',
        'Changed from owner',
    ];
    const v = new BehaviorSubject(null);
    test2.apiDest18
        .subscribe((propVal) => {
        const val = expectedVals.shift();
        t.is(propVal, val);
        if (expectedVals.length === 0) {
            // subscription.unsubscribe();
            v.complete();
        }
    });
    test1.apiSource18 = 'Changed from owner';
    try {
        yassi.communicate('TestSource.apiSource18', 'change18', ['change on api request - requested', 'yassi', 'awesome']);
    }
    catch (err) {
        t.is(err.message, 'communicate is deprecated, please use castRequest instead');
    }
    return v;
});
test('Fail to change array item from listener', (t) => {
    class TestDest {
    }
    __decorate([
        observe('TestSource.arraySource19'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop19", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedValues = [[1, 2, 3], [1, 2, 3, 'a']];
    let v = new BehaviorSubject(null);
    test2.prop19.subscribe((val) => {
        t.deepEqual(val, expectedValues.shift());
        if (val.length === 4) {
            // Now lets try to push something from the listener
            val.push('not affecting yassi');
        }
        if (expectedValues.length === 0) {
            v.complete();
        }
    });
    test1.arrayProp19.push('a');
    return v;
});
test('Fail to change object property from listener', (t) => {
    class TestDest {
    }
    __decorate([
        observe('TestSource.objectSource20'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop20", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedValues = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 2, b: 2, c: 3 }];
    let v = new BehaviorSubject(null);
    test2.prop20.subscribe((val) => {
        t.deepEqual(val, expectedValues.shift());
        if (val.a === 2) {
            // Now let's try to change the object from here, the listener
            val.a = 4;
        }
        if (val.c === 3) {
            val.d = 5;
        }
        if (expectedValues.length === 0) {
            v.complete();
        }
    });
    test1.objectProp20.a = 2;
    test1.objectProp20.c = 3;
    return v;
});
test('get a yassi property on demand without attaching to a local object', (t) => {
    const test1 = new TestSource();
    const sourceRef = yassi.get('TestSource.objectSource21');
    t.deepEqual(sourceRef, test1.objectProp21);
    sourceRef.getIt = false;
    t.is(test1.objectProp21.getIt, true);
});
test('observe false like values changes', (t) => {
    class TestDest {
    }
    __decorate([
        observe('TestSource.srcBoolLikeProp22'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop22", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedValues = [undefined, true, false, ''];
    let v = new BehaviorSubject(null);
    test2.prop22.subscribe((val) => {
        t.is(val, expectedValues.shift());
        if (expectedValues.length === 0) {
            v.complete();
        }
    });
    test1.boolLikeProp22 = true;
    test1.boolLikeProp22 = false;
    test1.boolLikeProp22 = '';
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
    registerMiddleware('yassit', 'after', (proto, key, val) => console.log(`-------${proto.constructor.name}.${key}=${val}-------`));
    const test1 = new TestSource();
    test1.numProp3 = 1234;
    t.is(test1.numProp3, 1234);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIveWFzc2kuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5Q0FBeUM7QUFDekMsMEJBQTBCOzs7Ozs7Ozs7O0FBRzFCLE9BQU8sRUFBQyxNQUFNLElBQUksSUFBSSxFQUFDLE1BQU0sS0FBSyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFckMsYUFBYTtBQUNiLHFCQUFxQjtBQUNyQixvQ0FBb0M7QUFDcEMseUJBQXlCO0FBQ3pCLElBQUk7QUFFSixNQUFNLFVBQVU7SUFBaEI7UUFLRSxhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRXJCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFHckIsYUFBUSxHQUFXLFdBQVcsQ0FBQztRQUcvQixhQUFRLEdBQVE7WUFDZCxHQUFHLEVBQUUsOEJBQThCO1NBQ3BDLENBQUM7UUFHRixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBR3hCLGVBQVUsR0FBVyxHQUFHLENBQUM7UUFNekIsZUFBVSxHQUFRLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFnQnZDLGlCQUFZLEdBQVE7WUFDbEIsS0FBSyxFQUFFLE1BQU07WUFDYixJQUFJLEVBQUUsTUFBTTtZQUNaLFNBQVMsRUFBRSxJQUFJO1NBQ2hCLENBQUM7UUFHRixnQkFBVyxHQUFXLGlCQUFpQixDQUFDO1FBR3hDLGtCQUFhLEdBQWEsQ0FBQztnQkFDekIsS0FBSyxFQUFFLENBQUM7YUFDVCxDQUFDLENBQUM7UUFHSCxnQkFB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