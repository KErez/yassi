"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const rxjs_1 = require("rxjs");
const exportedApi_1 = require("./exportedApi");
const store_1 = require("./store");
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
                resolve(null);
            }, 200);
        });
        return promise;
    }
    changeProp7Async() {
        setTimeout(() => this.asyncProp7 = 1414, 200);
    }
}
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcNumProp1'),
    __metadata("design:type", Number)
], TestSource.prototype, "numProp1", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcNumProp2'),
    __metadata("design:type", Number)
], TestSource.prototype, "numProp2", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcStringProp4'),
    __metadata("design:type", String)
], TestSource.prototype, "strProp4", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcObjProp5'),
    __metadata("design:type", Object)
], TestSource.prototype, "objProp5", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcAsyncNumProp6'),
    __metadata("design:type", Number)
], TestSource.prototype, "asyncProp6", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcAsyncNumProp7'),
    __metadata("design:type", Number)
], TestSource.prototype, "asyncProp7", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcAsyncObjProp8'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp8", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcAsyncObjProp9'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp9", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcAsyncObjProp10'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp10", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcAsyncObjProp11'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp11", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcArrayProp12'),
    __metadata("design:type", Array)
], TestSource.prototype, "arrayProp12", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.facadeSource15'),
    __metadata("design:type", Object)
], TestSource.prototype, "facadeProp15", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.apiSource16'),
    __metadata("design:type", String)
], TestSource.prototype, "apiSource16", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.markToUpdate17'),
    __metadata("design:type", Array)
], TestSource.prototype, "arraySource17", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.apiSource18'),
    __metadata("design:type", String)
], TestSource.prototype, "apiSource18", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.arraySource19'),
    __metadata("design:type", Array)
], TestSource.prototype, "arrayProp19", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.objectSource20'),
    __metadata("design:type", Object)
], TestSource.prototype, "objectProp20", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.objectSource21'),
    __metadata("design:type", Object)
], TestSource.prototype, "objectProp21", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcBoolLikeProp22'),
    __metadata("design:type", Object)
], TestSource.prototype, "boolLikeProp22", void 0);
__decorate([
    (0, exportedApi_1.endpoint)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestSource.prototype, "change16Empty", null);
__decorate([
    (0, exportedApi_1.endpoint)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TestSource.prototype, "change16", null);
__decorate([
    (0, exportedApi_1.endpoint)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TestSource.prototype, "change16Multiple", null);
__decorate([
    (0, exportedApi_1.endpoint)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TestSource.prototype, "change18", null);
(0, ava_1.serial)('object instance with Yassi but works as without', (t) => {
    const test1 = new TestSource();
    t.is(test1.numProp1, undefined);
    t.is(test1.numProp2, 2);
    t.is(test1.numProp3, 3);
    t.is(test1.strProp4, 'Not Again');
});
(0, ava_1.serial)("object A's property is selected by object B", (t) => {
    class TestDest {
        constructor() {
            this.myProp1 = 10;
        }
    }
    __decorate([
        (0, exportedApi_1.select)('TestSource.srcNumProp1'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "extProp1", void 0);
    __decorate([
        (0, exportedApi_1.select)('TestSource.srcNumProp2'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "extProp2", void 0);
    __decorate([
        (0, exportedApi_1.select)('TestSource.srcStringProp4'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "extProp3", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test1.numProp1, test2.extProp1);
    t.is(test1.numProp2, test2.extProp2);
    t.is(test1.numProp3, 3);
    t.is(test1.strProp4, test2.extProp3);
});
(0, ava_1.serial)('select property that does not exists in the store and expect undefined follow js behaviour', (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.select)('NoKeyFound'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "notFoundProp", void 0);
    __decorate([
        (0, exportedApi_1.select)('TestSource.srcNumProp1'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop1", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test1.numProp1, test2.prop1);
    t.is(test2.notFoundProp, undefined);
});
(0, ava_1.serial)("select A's property from obj B, change it on A and read it again on B. Expect to see the change", (t) => {
    class TestDest1 {
    }
    __decorate([
        (0, exportedApi_1.select)('TestSource.srcNumProp1'),
        __metadata("design:type", Object)
    ], TestDest1.prototype, "prop1", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest1();
    t.is(test1.numProp1, test2.prop1);
    test1.numProp1 = 1000;
    t.is(test2.prop1, 1000);
});
(0, ava_1.serial)('change to a selected property throw error', (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.select)('TestSource.srcNumProp2'),
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
(0, ava_1.serial)("yassit A's property of type object and read it on object B", (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.select)('TestSource.srcObjProp5'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop5", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test1.objProp5, test2.prop5);
});
(0, ava_1.serial)("yassit A's property of type object is by reference", (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.select)('TestSource.srcObjProp5'),
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
(0, ava_1.serial)("change selected property of type object throw error", (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.select)('TestSource.srcObjProp5'),
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
(0, ava_1.serial)('observe a store property using @observe and get the pushed values immediatly', (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.observe)('TestSource.srcNumProp2'),
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
(0, ava_1.serial)("change A's property asynchronously and read the change", async (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.select)('TestSource.srcAsyncNumProp6'),
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
(0, ava_1.serial)('observe an array changes', (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.observe)('TestSource.srcArrayProp12'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop12", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedValues = [undefined, [], [1], [1, 2]];
    let v = new rxjs_1.BehaviorSubject(null);
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
(0, ava_1.serial)('observe object were its property changes', (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.observe)('TestSource.srcAsyncObjProp8'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop8", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [undefined, { inner1: 5 }, { inner1: 8 }];
    let v = new rxjs_1.BehaviorSubject(null);
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
(0, ava_1.serial)('Change an initialized observed object', (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.observe)('TestSource.srcAsyncObjProp9'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop9", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [
        { prop1: 1, prop2: 2 },
        { prop3: 'other' },
        { prop4: 42 },
    ];
    let v = new rxjs_1.BehaviorSubject(null);
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
(0, ava_1.serial)('Change an uninitialized observed object', (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.observe)('TestSource.srcAsyncObjProp10'),
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
    let v = new rxjs_1.BehaviorSubject(null);
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
(0, ava_1.serial)("Change object's properties and observe them", (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.observe)('TestSource.srcAsyncObjProp11'),
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
    let v = new rxjs_1.BehaviorSubject(null);
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
(0, ava_1.serial)('No annotations yassit and observe', (t) => {
    class TestDest {
    }
    const test1 = new TestSource();
    const test2 = new TestDest();
    exportedApi_1.yassi.yassit('TestSource.noAnnotationProp13', test1, 'noAnnotationProp13');
    exportedApi_1.yassi.observe('TestSource.noAnnotationProp13', test2, 'prop13');
    const expectedVals = [
        undefined,
        { prop1: 'bla' },
        { prop1: 'changed' },
        { prop1: 'changed', prop3: 'other' },
        { prop1: 'changed', prop3: 'other', prop4: 42 },
    ];
    let v = new rxjs_1.BehaviorSubject(null);
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
(0, ava_1.serial)('yassit on an old js object without class and annotations', (t) => {
    function TestDest() {
        this.prop14 = undefined;
    }
    const test1 = new TestSource();
    const test2 = new TestDest();
    exportedApi_1.yassi.yassit('TestSource.oldJSObjectProp14', test1, 'oldJSObjectProp14');
    exportedApi_1.yassi.observe('TestSource.oldJSObjectProp14', test2, 'prop14');
    const expectedVals = [
        undefined,
        { prop1: 'bla' },
        { prop1: 'changed' },
        { prop1: 'changed', prop3: 'other' },
        { prop1: 'changed', prop3: 'other', prop4: 42 },
    ];
    let v = new rxjs_1.BehaviorSubject(null);
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
(0, ava_1.serial)('create a facade on top of stored element', (t) => {
    exportedApi_1.yassi.facade('facadeDest_fullName', ['TestSource.facadeSource15'], ([userObj]) => {
        if (!userObj) {
            return null;
        }
        return `${userObj.first} ${userObj.last}`;
    });
    t.is(store_1.yassiStore.has('TestSource.facadeSource15'), true);
    t.is(store_1.yassiStore.has('facadeDest_fullName'), true);
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.observe)('facadeDest_fullName'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "fullNameProp15", void 0);
    // @ts-ignore
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [
        'Kfir Erez',
    ];
    let v = new rxjs_1.BehaviorSubject(null);
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
(0, ava_1.serial)('markToUpdate a property that deeply changed', (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.observe)('TestSource.markToUpdate17'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "markToUpdate$", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [
        [{ count: 0 }],
        [{ count: 2 }],
    ];
    let v = new rxjs_1.BehaviorSubject(null);
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
    exportedApi_1.yassi.republish('TestSource.markToUpdate17');
    return v;
});
(0, ava_1.serial)('Fail to create facade with invalid characters', (t) => {
    try {
        exportedApi_1.yassi.facade('1facadeDest.fullName', ['TestSource.facadeSource15'], ([userObj]) => {
            return `${userObj.first} ${userObj.last}`;
        });
    }
    catch (e) {
        t.is(e.message, 'You must provide valid yassiPropertyName');
    }
    try {
        exportedApi_1.yassi.facade('facadeDest.fullName', ['TestSource.facadeSource15'], ([userObj]) => {
            return `${userObj.first} ${userObj.last}`;
        });
    }
    catch (e) {
        t.is(e.message, 'You must provide valid name and yassiElementsName when using facade');
    }
});
(0, ava_1.serial)('Interact with property owner via castRequest', (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.observe)('TestSource.apiSource16'),
        __metadata("design:type", rxjs_1.Observable)
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
    const v = new rxjs_1.BehaviorSubject(null);
    test2.apiDest16
        .subscribe((propVal) => {
        const val = expectedVals.shift();
        t.is(propVal, val);
        if (expectedVals.length === 0) {
            // subscription.unsubscribe();
            v.complete();
        }
    });
    exportedApi_1.yassi.castRequest('TestSource.apiSource16', 'change16Empty');
    test1.apiSource16 = 'Changed from owner';
    exportedApi_1.yassi.castRequest('TestSource.apiSource16', 'change16', 'change on api request - requested');
    test1.apiSource16 = 'Changed from owner';
    exportedApi_1.yassi.castRequest('TestSource.apiSource16', 'change16Multiple', 'change on api request - requested', 'yassi', 'awesome');
    return v;
});
(0, ava_1.serial)('Interact with property owner via older communicate version', (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.observe)('TestSource.apiSource18'),
        __metadata("design:type", rxjs_1.Observable)
    ], TestDest.prototype, "apiDest18", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [
        'Restricted area',
        'Changed from owner',
    ];
    const v = new rxjs_1.BehaviorSubject(null);
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
        exportedApi_1.yassi.communicate('TestSource.apiSource18', 'change18', ['change on api request - requested', 'yassi', 'awesome']);
    }
    catch (err) {
        t.is(err.message, 'communicate is deprecated, please use castRequest instead');
    }
    return v;
});
(0, ava_1.serial)('Fail to change array item from listener', (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.observe)('TestSource.arraySource19'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop19", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedValues = [[1, 2, 3], [1, 2, 3, 'a']];
    let v = new rxjs_1.BehaviorSubject(null);
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
(0, ava_1.serial)('Fail to change object property from listener', (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.observe)('TestSource.objectSource20'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop20", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedValues = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 2, b: 2, c: 3 }];
    let v = new rxjs_1.BehaviorSubject(null);
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
(0, ava_1.serial)('get a yassi property on demand without attaching to a local object', (t) => {
    const test1 = new TestSource();
    const sourceRef = exportedApi_1.yassi.get('TestSource.objectSource21');
    t.deepEqual(sourceRef, test1.objectProp21);
    sourceRef.getIt = false;
    t.is(test1.objectProp21.getIt, true);
});
(0, ava_1.serial)('observe false like values changes', (t) => {
    class TestDest {
    }
    __decorate([
        (0, exportedApi_1.observe)('TestSource.srcBoolLikeProp22'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop22", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedValues = [undefined, true, false, ''];
    let v = new rxjs_1.BehaviorSubject(null);
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
(0, ava_1.serial)('registerMiddleware for before yassit', (t) => {
    (0, exportedApi_1.registerMiddleware)('yassit', 'before');
    const test1 = new TestSource();
    t.is(test1.numProp2, 2);
    test1.numProp2 = 444;
    t.log('We should see the number 444 printed to console.');
});
(0, ava_1.serial)('register middleware for after yassit', (t) => {
    (0, exportedApi_1.registerMiddleware)('yassit', 'after', (proto, key, val) => console.log(`-------${proto.constructor.name}.${key}=${val}-------`));
    const test1 = new TestSource();
    test1.numProp3 = 1234;
    t.is(test1.numProp3, 1234);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIveWFzc2kuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBQXlDO0FBQ3pDLDBCQUEwQjs7Ozs7Ozs7Ozs7QUFHMUIsNkJBQW1DO0FBQ25DLCtCQUFtRDtBQUVuRCwrQ0FBNkY7QUFDN0YsbUNBQXFDO0FBRXJDLGFBQWE7QUFDYixxQkFBcUI7QUFDckIsb0NBQW9DO0FBQ3BDLHlCQUF5QjtBQUN6QixJQUFJO0FBRUosTUFBTSxVQUFVO0lBQWhCO1FBS0UsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBR3JCLGFBQVEsR0FBVyxXQUFXLENBQUM7UUFHL0IsYUFBUSxHQUFRO1lBQ2QsR0FBRyxFQUFFLDhCQUE4QjtTQUNwQyxDQUFDO1FBR0YsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUd4QixlQUFVLEdBQVcsR0FBRyxDQUFDO1FBTXpCLGVBQVUsR0FBUSxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDO1FBZ0J2QyxpQkFBWSxHQUFRO1lBQ2xCLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLE1BQU07WUFDWixTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUFDO1FBR0YsZ0JBQVcsR0FBVyxpQkFBaUIsQ0FBQztRQUd4QyxrQkFBYSxHQUFhLENBQUM7Z0JBQ3pCLEtBQUssRUFBRSxDQUFDO2FBQ1QsQ0FBQyxDQUFDO1FBR0gsZ0JBQVcsR0FBVyxpQkFBaUIsQ0FBQztRQUd4QyxnQkFBVyxHQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUcvQixpQkFBWSxHQUFRO1lBQ2xCLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDTCxDQUFBO1FBR0QsaUJBQVksR0FBUTtZQUNsQixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUE7SUF3Q0gsQ0FBQztJQWxDQyxhQUFhO1FBQ1gsSUFBSSxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQztJQUN4QyxDQUFDO0lBR0QsUUFBUSxDQUFDLFdBQVc7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBR0QsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNO1FBQzFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLE9BQU8sTUFBTSxPQUFPLE1BQU0sRUFBRSxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0lBQ3pCLENBQUM7SUFHRCxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNO1FBQzlCLE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLE9BQU8sTUFBTSxPQUFPLE1BQU0sRUFBRSxDQUFDO1FBQ25GLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3BDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDVixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNGO0FBOUdDO0lBREMsSUFBQSxvQkFBTSxFQUFDLHdCQUF3QixDQUFDOzs0Q0FDaEI7QUFHakI7SUFEQyxJQUFBLG9CQUFNLEVBQUMsd0JBQXdCLENBQUM7OzRDQUNaO0FBS3JCO0lBREMsSUFBQSxvQkFBTSxFQUFDLDJCQUEyQixDQUFDOzs0Q0FDTDtBQUcvQjtJQURDLElBQUEsb0JBQU0sRUFBQyx3QkFBd0IsQ0FBQzs7NENBRy9CO0FBR0Y7SUFEQyxJQUFBLG9CQUFNLEVBQUMsNkJBQTZCLENBQUM7OzhDQUNkO0FBR3hCO0lBREMsSUFBQSxvQkFBTSxFQUFDLDZCQUE2QixDQUFDOzs4Q0FDYjtBQUd6QjtJQURDLElBQUEsb0JBQU0sRUFBQyw2QkFBNkIsQ0FBQzs7OENBQ3RCO0FBR2hCO0lBREMsSUFBQSxvQkFBTSxFQUFDLDZCQUE2QixDQUFDOzs4Q0FDQztBQUd2QztJQURDLElBQUEsb0JBQU0sRUFBQyw4QkFBOEIsQ0FBQzs7K0NBQ3RCO0FBR2pCO0lBREMsSUFBQSxvQkFBTSxFQUFDLDhCQUE4QixDQUFDOzsrQ0FDdEI7QUFHakI7SUFEQyxJQUFBLG9CQUFNLEVBQUMsMkJBQTJCLENBQUM7OytDQUNqQjtBQU9uQjtJQURDLElBQUEsb0JBQU0sRUFBQywyQkFBMkIsQ0FBQzs7Z0RBS2xDO0FBR0Y7SUFEQyxJQUFBLG9CQUFNLEVBQUMsd0JBQXdCLENBQUM7OytDQUNPO0FBR3hDO0lBREMsSUFBQSxvQkFBTSxFQUFDLDJCQUEyQixDQUFDOztpREFHakM7QUFHSDtJQURDLElBQUEsb0JBQU0sRUFBQyx3QkFBd0IsQ0FBQzs7K0NBQ087QUFHeEM7SUFEQyxJQUFBLG9CQUFNLEVBQUMsMEJBQTBCLENBQUM7OytDQUNKO0FBRy9CO0lBREMsSUFBQSxvQkFBTSxFQUFDLDJCQUEyQixDQUFDOztnREFJbkM7QUFHRDtJQURDLElBQUEsb0JBQU0sRUFBQywyQkFBMkIsQ0FBQzs7Z0RBR25DO0FBR0Q7SUFEQyxJQUFBLG9CQUFNLEVBQUMsOEJBQThCLENBQUM7O2tEQUNuQjtBQUdwQjtJQURDLElBQUEsc0JBQVEsR0FBRTs7OzsrQ0FHVjtBQUdEO0lBREMsSUFBQSxzQkFBUSxHQUFFOzs7OzBDQUdWO0FBR0Q7SUFEQyxJQUFBLHNCQUFRLEdBQUU7Ozs7a0RBSVY7QUFHRDtJQURDLElBQUEsc0JBQVEsR0FBRTs7OzswQ0FJVjtBQWlCSCxJQUFBLFlBQUksRUFBQyxpREFBaUQsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzVELE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUFDL0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBQSxZQUFJLEVBQUMsNkNBQTZDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN4RCxNQUFNLFFBQVE7UUFBZDtZQUtFLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQztLQUFBO0lBTG1DO1FBQWpDLElBQUEsb0JBQU0sRUFBQyx3QkFBd0IsQ0FBQzs7OENBQVU7SUFDVDtRQUFqQyxJQUFBLG9CQUFNLEVBQUMsd0JBQXdCLENBQUM7OzhDQUFVO0lBQ047UUFBcEMsSUFBQSxvQkFBTSxFQUFDLDJCQUEyQixDQUFDOzs4Q0FBVTtJQUtoRCxNQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBQSxZQUFJLEVBQUMsNEZBQTRGLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN2RyxNQUFNLFFBQVE7S0FHYjtJQUZ1QjtRQUFyQixJQUFBLG9CQUFNLEVBQUMsWUFBWSxDQUFDOztrREFBYztJQUNEO1FBQWpDLElBQUEsb0JBQU0sRUFBQyx3QkFBd0IsQ0FBQzs7MkNBQU87SUFHMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBQSxZQUFJLEVBQUMsaUdBQWlHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUM1RyxNQUFNLFNBQVM7S0FFZDtJQURtQztRQUFqQyxJQUFBLG9CQUFNLEVBQUMsd0JBQXdCLENBQUM7OzRDQUFPO0lBRzFDLE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztJQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsWUFBSSxFQUFDLDJDQUEyQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDdEQsTUFBTSxRQUFRO0tBRWI7SUFEbUM7UUFBakMsSUFBQSxvQkFBTSxFQUFDLHdCQUF3QixDQUFDOzsyQ0FBTztJQUcxQyxhQUFhO0lBQ2IsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUM3QixDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckIsSUFBSTtRQUNGLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ3BCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsa0VBQWtFLENBQUMsQ0FBQztLQUNyRjtJQUNELENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsWUFBSSxFQUFDLDREQUE0RCxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDdkUsTUFBTSxRQUFRO0tBRWI7SUFEbUM7UUFBakMsSUFBQSxvQkFBTSxFQUFDLHdCQUF3QixDQUFDOzsyQ0FBTztJQUcxQyxNQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsWUFBSSxFQUFDLG9EQUFvRCxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDL0QsTUFBTSxRQUFRO0tBRWI7SUFEbUM7UUFBakMsSUFBQSxvQkFBTSxFQUFDLHdCQUF3QixDQUFDOzsyQ0FBTztJQUcxQyxNQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztJQUMvQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDakQsS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxvQkFBb0IsQ0FBQztJQUNwRCxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQTtBQUM3RCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsWUFBSSxFQUFDLHFEQUFxRCxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDaEUsTUFBTSxRQUFRO0tBRWI7SUFEbUM7UUFBakMsSUFBQSxvQkFBTSxFQUFDLHdCQUF3QixDQUFDOzsyQ0FBTztJQUcxQyxNQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQztJQUMvQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDakQsSUFBSTtRQUNGLEtBQUssQ0FBQyxLQUFLLEdBQUc7WUFDWixHQUFHLEVBQUUsNENBQTRDO1NBQ2xELENBQUE7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLGtFQUFrRSxDQUFDLENBQUM7S0FDckY7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsWUFBSSxFQUFDLDhFQUE4RSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDekYsTUFBTSxRQUFRO0tBRWI7SUFEb0M7UUFBbEMsSUFBQSxxQkFBTyxFQUFDLHdCQUF3QixDQUFDOzsyQ0FBTztJQUczQyxNQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDN0IsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDcEIsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDcEIsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBQSxZQUFJLEVBQUMsd0RBQXdELEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3pFLE1BQU0sUUFBUTtLQUViO0lBRHdDO1FBQXRDLElBQUEsb0JBQU0sRUFBQyw2QkFBNkIsQ0FBQzs7MkNBQU87SUFHL0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQzdCLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0QixNQUFNLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQy9CLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQztBQUVILHNFQUFzRTtBQUN0RSxrQkFBa0I7QUFDbEIsc0JBQXNCO0FBQ3RCLDhEQUE4RDtBQUM5RCxNQUFNO0FBQ04sOEZBQThGO0FBQzlGLE1BQU07QUFFTixJQUFBLFlBQUksRUFBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sUUFBUTtLQUViO0lBRHVDO1FBQXJDLElBQUEscUJBQU8sRUFBQywyQkFBMkIsQ0FBQzs7NENBQVE7SUFHL0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQzdCLE1BQU0sY0FBYyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsSUFBSSxDQUFDLEdBQUcsSUFBSSxzQkFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBVSxFQUFFLEVBQUU7UUFDcEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMvQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDZDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDdkIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsWUFBSSxFQUFDLDBDQUEwQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDckQsTUFBTSxRQUFRO0tBRWI7SUFEeUM7UUFBdkMsSUFBQSxxQkFBTyxFQUFDLDZCQUE2QixDQUFDOzsyQ0FBTztJQUdoRCxNQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFFN0IsTUFBTSxZQUFZLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUMzRCxJQUFJLENBQUMsR0FBRyxJQUFJLHNCQUFlLENBQU0sSUFBSSxDQUFDLENBQUM7SUFDdkMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUM1QixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2QyxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNkO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsVUFBVSxHQUFHO1FBQ2pCLE1BQU0sRUFBRSxDQUFDO0tBQ1YsQ0FBQztJQUNGLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUM1QixPQUFPLENBQUMsQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDO0FBR0gsSUFBQSxZQUFJLEVBQUMsdUNBQXVDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNsRCxNQUFNLFFBQVE7S0FFYjtJQUR5QztRQUF2QyxJQUFBLHFCQUFPLEVBQUMsNkJBQTZCLENBQUM7OzJDQUFPO0lBR2hELE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUU3QixNQUFNLFlBQVksR0FBRztRQUNuQixFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQztRQUNwQixFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUM7UUFDaEIsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDO0tBQ1osQ0FBQztJQUNGLElBQUksQ0FBQyxHQUFHLElBQUksc0JBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztJQUN2QyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM1QixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN2QyxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM3QixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLFVBQVUsR0FBRztZQUNqQixLQUFLLEVBQUUsT0FBTztTQUNmLENBQUM7UUFDRixLQUFLLENBQUMsVUFBVSxHQUFHO1lBQ2pCLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQztJQUNKLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztJQUNOLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFBLFlBQUksRUFBQyx5Q0FBeUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3BELE1BQU0sUUFBUTtLQUViO0lBRDBDO1FBQXhDLElBQUEscUJBQU8sRUFBQyw4QkFBOEIsQ0FBQzs7NENBQVE7SUFHbEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBRTdCLE1BQU0sWUFBWSxHQUFHO1FBQ25CLFNBQVM7UUFDVCxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUM7UUFDZCxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUM7UUFDaEIsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDO0tBQ1osQ0FBQztJQUNGLElBQUksQ0FBQyxHQUFHLElBQUksc0JBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztJQUN2QyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzdCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDN0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2Q7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxXQUFXLEdBQUc7UUFDbEIsS0FBSyxFQUFFLEtBQUs7S0FDYixDQUFDO0lBQ0YsS0FBSyxDQUFDLFdBQVcsR0FBRztRQUNsQixLQUFLLEVBQUUsT0FBTztLQUNmLENBQUM7SUFDRixLQUFLLENBQUMsV0FBVyxHQUFHO1FBQ2xCLEtBQUssRUFBRSxFQUFFO0tBQ1YsQ0FBQztJQUNGLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFBLFlBQUksRUFBQyw2Q0FBNkMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3hELE1BQU0sUUFBUTtLQUViO0lBRDBDO1FBQXhDLElBQUEscUJBQU8sRUFBQyw4QkFBOEIsQ0FBQzs7NENBQVE7SUFHbEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBRTdCLE1BQU0sWUFBWSxHQUFHO1FBQ25CLFNBQVM7UUFDVCxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUM7UUFDZCxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUM7UUFDbEIsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUM7UUFDbEMsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQztLQUM5QyxDQUFDO0lBQ0YsSUFBSSxDQUFDLEdBQUcsSUFBSSxzQkFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzdCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsV0FBVyxHQUFHO1lBQ2xCLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQztRQUNGLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUNwQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDbEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQy9CLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztJQUVOLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFBLFlBQUksRUFBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzlDLE1BQU0sUUFBUTtLQUViO0lBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBRTdCLG1CQUFLLENBQUMsTUFBTSxDQUFDLCtCQUErQixFQUFFLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQzNFLG1CQUFLLENBQUMsT0FBTyxDQUFDLCtCQUErQixFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVoRSxNQUFNLFlBQVksR0FBRztRQUNuQixTQUFTO1FBQ1QsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDO1FBQ2QsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFDO1FBQ2xCLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDO1FBQ2xDLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUM7S0FDOUMsQ0FBQztJQUNGLElBQUksQ0FBQyxHQUFHLElBQUksc0JBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztJQUN2QyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM3QixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN2QyxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM3QixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLGtCQUFrQixHQUFHO1lBQ3pCLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQztRQUNGLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQzNDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ3pDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3RDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztJQUVOLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFBLFlBQUksRUFBQywwREFBMEQsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3JFLFNBQVMsUUFBUTtRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFFN0IsbUJBQUssQ0FBQyxNQUFNLENBQUMsOEJBQThCLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDekUsbUJBQUssQ0FBQyxPQUFPLENBQUMsOEJBQThCLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRS9ELE1BQU0sWUFBWSxHQUFHO1FBQ25CLFNBQVM7UUFDVCxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUM7UUFDZCxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUM7UUFDbEIsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUM7UUFDbEMsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQztLQUM5QyxDQUFDO0lBQ0YsSUFBSSxDQUFDLEdBQUcsSUFBSSxzQkFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzdCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsaUJBQWlCLEdBQUc7WUFDeEIsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDO1FBQ0YsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDMUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDeEMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDckMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRU4sT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsWUFBSSxFQUFDLDBDQUEwQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDckQsbUJBQUssQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO1FBQy9FLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0lBRUgsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQyxFQUFFLENBQUMsa0JBQVUsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVsRCxNQUFNLFFBQVE7S0FHYjtJQURDO1FBREMsSUFBQSxxQkFBTyxFQUFDLHFCQUFxQixDQUFDOztvREFDaEI7SUFHakIsYUFBYTtJQUNiLE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUM3QixNQUFNLFlBQVksR0FBRztRQUNuQixXQUFXO0tBQ1osQ0FBQztJQUVGLElBQUksQ0FBQyxHQUFHLElBQUksc0JBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztJQUN2QyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFnQixFQUFFLEVBQUU7WUFDbEQsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFFTCxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBQSxZQUFJLEVBQUMsNkNBQTZDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUN4RCxNQUFNLFFBQVE7S0FHYjtJQURDO1FBREMsSUFBQSxxQkFBTyxFQUFDLDJCQUEyQixDQUFDOzttREFDdkI7SUFHaEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBRTdCLE1BQU0sWUFBWSxHQUFHO1FBQ25CLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDWixDQUFDLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDO0tBQ2IsQ0FBQztJQUVGLElBQUksQ0FBQyxHQUFHLElBQUksc0JBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztJQUN2QyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQWUsRUFBRSxFQUFFO1FBQ2hELE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNkO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCwrQkFBK0I7SUFDOUIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUMxQyxtQkFBSyxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBRTdDLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFBLFlBQUksRUFBQywrQ0FBK0MsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzFELElBQUk7UUFDRixtQkFBSyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLDJCQUEyQixDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7WUFDaEYsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFNLENBQUMsRUFBRTtRQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSwwQ0FBMEMsQ0FBQyxDQUFDO0tBQzdEO0lBQ0QsSUFBSTtRQUNGLG1CQUFLLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUMsMkJBQTJCLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRTtZQUMvRSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDM0MsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU0sQ0FBQyxFQUFFO1FBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLHFFQUFxRSxDQUFDLENBQUM7S0FDeEY7QUFDSCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsWUFBSSxFQUFDLDhDQUE4QyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDekQsTUFBTSxRQUFRO0tBR2I7SUFEQztRQURDLElBQUEscUJBQU8sRUFBQyx3QkFBd0IsQ0FBQztrQ0FDdkIsaUJBQVU7K0NBQU07SUFHN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBRTdCLE1BQU0sWUFBWSxHQUFHO1FBQ25CLGlCQUFpQjtRQUNqQixrQkFBa0I7UUFDbEIsb0JBQW9CO1FBQ3BCLGlDQUFpQztRQUNqQyxvQkFBb0I7UUFDcEIscURBQXFEO0tBQ3RELENBQUM7SUFDRixNQUFNLENBQUMsR0FBRyxJQUFJLHNCQUFlLENBQU0sSUFBSSxDQUFDLENBQUM7SUFDekMsS0FBSyxDQUFDLFNBQVM7U0FDWixTQUFTLENBQUMsQ0FBQyxPQUFlLEVBQUUsRUFBRTtRQUM3QixNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM3Qiw4QkFBOEI7WUFDOUIsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2Q7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLG1CQUFLLENBQUMsV0FBVyxDQUFDLHdCQUF3QixFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBRTdELEtBQUssQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLENBQUM7SUFDekMsbUJBQUssQ0FBQyxXQUFXLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLG1DQUFtQyxDQUFDLENBQUM7SUFFN0YsS0FBSyxDQUFDLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQztJQUN6QyxtQkFBSyxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsRUFBRSxrQkFBa0IsRUFBRSxtQ0FBbUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFekgsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsWUFBSSxFQUFDLDREQUE0RCxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDdkUsTUFBTSxRQUFRO0tBR2I7SUFEQztRQURDLElBQUEscUJBQU8sRUFBQyx3QkFBd0IsQ0FBQztrQ0FDdkIsaUJBQVU7K0NBQU07SUFHN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBRTdCLE1BQU0sWUFBWSxHQUFHO1FBQ25CLGlCQUFpQjtRQUNqQixvQkFBb0I7S0FDckIsQ0FBQztJQUNGLE1BQU0sQ0FBQyxHQUFHLElBQUksc0JBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztJQUN6QyxLQUFLLENBQUMsU0FBUztTQUNaLFNBQVMsQ0FBQyxDQUFDLE9BQWUsRUFBRSxFQUFFO1FBQzdCLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdCLDhCQUE4QjtZQUM5QixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDZDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUwsS0FBSyxDQUFDLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQztJQUN6QyxJQUFJO1FBQ0YsbUJBQUssQ0FBQyxXQUFXLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLENBQUMsbUNBQW1DLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7S0FDcEg7SUFBQyxPQUFNLEdBQUcsRUFBRTtRQUNYLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSwyREFBMkQsQ0FBQyxDQUFDO0tBQ2hGO0lBRUQsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsWUFBSSxFQUFDLHlDQUF5QyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDcEQsTUFBTSxRQUFRO0tBRWI7SUFEc0M7UUFBcEMsSUFBQSxxQkFBTyxFQUFDLDBCQUEwQixDQUFDOzs0Q0FBUTtJQUc5QyxNQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7SUFDN0IsTUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25ELElBQUksQ0FBQyxHQUFHLElBQUksc0JBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztJQUN2QyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO1FBQ3BDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDcEIsbURBQW1EO1lBQ25ELEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUNqQztRQUNELElBQUksY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDL0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2Q7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFBLFlBQUksRUFBQyw4Q0FBOEMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ3pELE1BQU0sUUFBUTtLQUViO0lBRHVDO1FBQXJDLElBQUEscUJBQU8sRUFBQywyQkFBMkIsQ0FBQzs7NENBQVE7SUFHL0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQzdCLE1BQU0sY0FBYyxHQUFVLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQzlFLElBQUksQ0FBQyxHQUFHLElBQUksc0JBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztJQUN2QyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ2xDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDZiw2REFBNkQ7WUFDN0QsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDWDtRQUNELElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDZixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNYO1FBQ0QsSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMvQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDZDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixPQUFPLENBQUMsQ0FBQztBQUNYLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBQSxZQUFJLEVBQUMsb0VBQW9FLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUMvRSxNQUFNLEtBQUssR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBRS9CLE1BQU0sU0FBUyxHQUFHLG1CQUFLLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzNDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFBLFlBQUksRUFBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzlDLE1BQU0sUUFBUTtLQUViO0lBRDBDO1FBQXhDLElBQUEscUJBQU8sRUFBQyw4QkFBOEIsQ0FBQzs7NENBQVE7SUFHbEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQzdCLE1BQU0sY0FBYyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEQsSUFBSSxDQUFDLEdBQUcsSUFBSSxzQkFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBWSxFQUFFLEVBQUU7UUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbEMsSUFBSSxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMvQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDZDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDNUIsS0FBSyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDN0IsS0FBSyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDMUIsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDLENBQUMsQ0FBQztBQUVILElBQUEsWUFBSSxFQUFDLHNDQUFzQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDakQsSUFBQSxnQ0FBa0IsRUFBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztJQUMvQixDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsS0FBSyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDckIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0FBQzVELENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBQSxZQUFJLEVBQUMsc0NBQXNDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUNqRCxJQUFBLGdDQUFrQixFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQ2xDLENBQUMsS0FBVSxFQUFFLEdBQVcsRUFBRSxHQUFRLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQy9HLE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7SUFDL0IsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdCLENBQUMsQ0FBQyxDQUFDIn0=