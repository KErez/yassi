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
            msg: 'this is a property in object',
        };
        this.asyncProp6 = 42;
        this.asyncProp7 = 314;
        this.asyncProp9 = { prop1: 1, prop2: 2 };
        this.facadeProp15 = {
            first: 'Kfir',
            last: 'Erez',
            birthYear: 1975,
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
        const promise = new Promise((resolve) => {
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
    __metadata("design:type", Object)
], TestSource.prototype, "numProp2", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcStringProp4'),
    __metadata("design:type", Object)
], TestSource.prototype, "strProp4", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcObjProp5'),
    __metadata("design:type", Object)
], TestSource.prototype, "objProp5", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcAsyncNumProp6'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp6", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.srcAsyncNumProp7'),
    __metadata("design:type", Object)
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
    __metadata("design:type", Object)
], TestSource.prototype, "apiSource16", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.markToUpdate17'),
    __metadata("design:type", Array)
], TestSource.prototype, "arraySource17", void 0);
__decorate([
    (0, exportedApi_1.yassit)('TestSource.apiSource18'),
    __metadata("design:type", Object)
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
(0, ava_1.serial)('change selected property of type object throw error', (t) => {
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
            msg: 'message in another object. Throw exception',
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
    const v = new rxjs_1.BehaviorSubject(null);
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
    const v = new rxjs_1.BehaviorSubject(null);
    test2.prop8.subscribe((val) => {
        t.deepEqual(val, expectedVals.shift());
        if (expectedVals.length === 0) {
            v.complete();
        }
    });
    test1.asyncProp8 = {
        inner1: 5,
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
    const expectedVals = [{ prop1: 1, prop2: 2 }, { prop3: 'other' }, { prop4: 42 }];
    const v = new rxjs_1.BehaviorSubject(null);
    setTimeout(() => {
        test2.prop9.subscribe((val) => {
            t.deepEqual(val, expectedVals.shift());
            if (expectedVals.length === 0) {
                v.complete();
            }
        });
        test1.asyncProp9 = {
            prop3: 'other',
        };
        test1.asyncProp9 = {
            prop4: 42,
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
    const expectedVals = [undefined, { prop1: 'bla' }, { prop3: 'other' }, { prop4: 42 }];
    const v = new rxjs_1.BehaviorSubject(null);
    test2.prop10.subscribe((val) => {
        t.deepEqual(val, expectedVals.shift());
        if (expectedVals.length === 0) {
            v.complete();
        }
    });
    test1.asyncProp10 = {
        prop1: 'bla',
    };
    test1.asyncProp10 = {
        prop3: 'other',
    };
    test1.asyncProp10 = {
        prop4: 42,
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
    const v = new rxjs_1.BehaviorSubject(null);
    setTimeout(() => {
        test2.prop11.subscribe((val) => {
            t.deepEqual(val, expectedVals.shift());
            if (expectedVals.length === 0) {
                v.complete();
            }
        });
        test1.asyncProp11 = {
            prop1: 'bla',
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
    const v = new rxjs_1.BehaviorSubject(null);
    setTimeout(() => {
        test2.prop13.subscribe((val) => {
            t.deepEqual(val, expectedVals.shift());
            if (expectedVals.length === 0) {
                v.complete();
            }
        });
        test1.noAnnotationProp13 = {
            prop1: 'bla',
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
    const v = new rxjs_1.BehaviorSubject(null);
    setTimeout(() => {
        test2.prop14.subscribe((val) => {
            t.deepEqual(val, expectedVals.shift());
            if (expectedVals.length === 0) {
                v.complete();
            }
        });
        test1.oldJSObjectProp14 = {
            prop1: 'bla',
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
    const expectedVals = ['Kfir Erez'];
    const v = new rxjs_1.BehaviorSubject(null);
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
    const expectedVals = [[{ count: 0 }], [{ count: 2 }]];
    const v = new rxjs_1.BehaviorSubject(null);
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
    test2.apiDest16.subscribe((propVal) => {
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
    const expectedVals = ['Restricted area', 'Changed from owner'];
    const v = new rxjs_1.BehaviorSubject(null);
    test2.apiDest18.subscribe((propVal) => {
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
    const expectedValues = [
        [1, 2, 3],
        [1, 2, 3, 'a'],
    ];
    const v = new rxjs_1.BehaviorSubject(null);
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
    const expectedValues = [
        { a: 1, b: 2 },
        { a: 2, b: 2 },
        { a: 2, b: 2, c: 3 },
    ];
    const v = new rxjs_1.BehaviorSubject(null);
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
    const v = new rxjs_1.BehaviorSubject(null);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIveWFzc2kuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBQXlDO0FBQ3pDLDBCQUEwQjs7Ozs7Ozs7Ozs7QUFFMUIsNkJBQXFDO0FBQ3JDLCtCQUFtRDtBQUVuRCwrQ0FBNkY7QUFDN0YsbUNBQXFDO0FBRXJDLGFBQWE7QUFDYixxQkFBcUI7QUFDckIsb0NBQW9DO0FBQ3BDLHlCQUF5QjtBQUN6QixJQUFJO0FBRUosTUFBTSxVQUFVO0lBQWhCO1FBS0UsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUViLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFHYixhQUFRLEdBQUcsV0FBVyxDQUFDO1FBR3ZCLGFBQVEsR0FBUTtZQUNkLEdBQUcsRUFBRSw4QkFBOEI7U0FDcEMsQ0FBQztRQUdGLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFHaEIsZUFBVSxHQUFHLEdBQUcsQ0FBQztRQU1qQixlQUFVLEdBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztRQWdCekMsaUJBQVksR0FBUTtZQUNsQixLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSxNQUFNO1lBQ1osU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQztRQUdGLGdCQUFXLEdBQUcsaUJBQWlCLENBQUM7UUFHaEMsa0JBQWEsR0FBYSxDQUFDO2dCQUN6QixLQUFLLEVBQUUsQ0FBQzthQUNULENBQUMsQ0FBQztRQUdILGdCQUFXLEdBQUcsaUJBQWlCLENBQUM7UUFHaEMsZ0JBQVcsR0FBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFHL0IsaUJBQVksR0FBUTtZQUNsQixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1NBQ0wsQ0FBQztRQUdGLGlCQUFZLEdBQVE7WUFDbEIsS0FBSyxFQUFFLElBQUk7U0FD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