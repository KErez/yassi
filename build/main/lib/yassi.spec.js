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
    exportedApi_1.yassit('TestSource.srcNumProp1'),
    __metadata("design:type", Number)
], TestSource.prototype, "numProp1", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.srcNumProp2'),
    __metadata("design:type", Number)
], TestSource.prototype, "numProp2", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.srcStringProp4'),
    __metadata("design:type", String)
], TestSource.prototype, "strProp4", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.srcObjProp5'),
    __metadata("design:type", Object)
], TestSource.prototype, "objProp5", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.srcAsyncNumProp6'),
    __metadata("design:type", Number)
], TestSource.prototype, "asyncProp6", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.srcAsyncNumProp7'),
    __metadata("design:type", Number)
], TestSource.prototype, "asyncProp7", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.srcAsyncObjProp8'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp8", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.srcAsyncObjProp9'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp9", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.srcAsyncObjProp10'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp10", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.srcAsyncObjProp11'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp11", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.srcArrayProp12'),
    __metadata("design:type", Array)
], TestSource.prototype, "arrayProp12", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.facadeSource15'),
    __metadata("design:type", Object)
], TestSource.prototype, "facadeProp15", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.apiSource16'),
    __metadata("design:type", String)
], TestSource.prototype, "apiSource16", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.markToUpdate17'),
    __metadata("design:type", Array)
], TestSource.prototype, "arraySource17", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.apiSource18'),
    __metadata("design:type", String)
], TestSource.prototype, "apiSource18", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.arraySource19'),
    __metadata("design:type", Array)
], TestSource.prototype, "arrayProp19", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.objectSource20'),
    __metadata("design:type", Object)
], TestSource.prototype, "objectProp20", void 0);
__decorate([
    exportedApi_1.yassit('TestSource.objectSource21'),
    __metadata("design:type", Object)
], TestSource.prototype, "objectProp21", void 0);
__decorate([
    exportedApi_1.endpoint(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestSource.prototype, "change16Empty", null);
__decorate([
    exportedApi_1.endpoint(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TestSource.prototype, "change16", null);
__decorate([
    exportedApi_1.endpoint(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TestSource.prototype, "change16Multiple", null);
__decorate([
    exportedApi_1.endpoint(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TestSource.prototype, "change18", null);
ava_1.serial('object instance with Yassi but works as without', (t) => {
    const test1 = new TestSource();
    t.is(test1.numProp1, undefined);
    t.is(test1.numProp2, 2);
    t.is(test1.numProp3, 3);
    t.is(test1.strProp4, 'Not Again');
});
ava_1.serial("object A's property is selected by object B", (t) => {
    class TestDest {
        constructor() {
            this.myProp1 = 10;
        }
    }
    __decorate([
        exportedApi_1.select('TestSource.srcNumProp1'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "extProp1", void 0);
    __decorate([
        exportedApi_1.select('TestSource.srcNumProp2'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "extProp2", void 0);
    __decorate([
        exportedApi_1.select('TestSource.srcStringProp4'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "extProp3", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test1.numProp1, test2.extProp1);
    t.is(test1.numProp2, test2.extProp2);
    t.is(test1.numProp3, 3);
    t.is(test1.strProp4, test2.extProp3);
});
ava_1.serial('select property that does not exists in the store and expect undefined follow js behaviour', (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.select('NoKeyFound'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "notFoundProp", void 0);
    __decorate([
        exportedApi_1.select('TestSource.srcNumProp1'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop1", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test1.numProp1, test2.prop1);
    t.is(test2.notFoundProp, undefined);
});
ava_1.serial("select A's property from obj B, change it on A and read it again on B. Expect to see the change", (t) => {
    class TestDest1 {
    }
    __decorate([
        exportedApi_1.select('TestSource.srcNumProp1'),
        __metadata("design:type", Object)
    ], TestDest1.prototype, "prop1", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest1();
    t.is(test1.numProp1, test2.prop1);
    test1.numProp1 = 1000;
    t.is(test2.prop1, 1000);
});
ava_1.serial('change to a selected property throw error', (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.select('TestSource.srcNumProp2'),
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
ava_1.serial("yassit A's property of type object and read it on object B", (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.select('TestSource.srcObjProp5'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop5", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test1.objProp5, test2.prop5);
});
ava_1.serial("yassit A's property of type object is by reference", (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.select('TestSource.srcObjProp5'),
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
ava_1.serial("change selected property of type object throw error", (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.select('TestSource.srcObjProp5'),
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
ava_1.serial('observe a store property using @observe and get the pushed values immediatly', (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.observe('TestSource.srcNumProp2'),
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
ava_1.serial("change A's property asynchronously and read the change", async (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.select('TestSource.srcAsyncNumProp6'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop6", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test2.prop6, 42);
    await test1.changeProp6Async();
    t.is(test2.prop6, 345);
});
ava_1.serial('yassit on existing entry name throw exception', (t) => {
    try {
        // @ts-ignore
        class TesetDest {
        }
        __decorate([
            exportedApi_1.yassit('TestSource.srcNumProp2'),
            __metadata("design:type", Object)
        ], TesetDest.prototype, "illegalPropDecorator", void 0);
    }
    catch (e) {
        t.is(e.message, 'Store already has an active entry with name TestSource.srcNumProp2');
    }
});
ava_1.serial('observe an array changes', (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.observe('TestSource.srcArrayProp12'),
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
ava_1.serial('observe object were its property changes', (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.observe('TestSource.srcAsyncObjProp8'),
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
ava_1.serial('Change an initialized observed object', (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.observe('TestSource.srcAsyncObjProp9'),
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
ava_1.serial('Change an uninitialized observed object', (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.observe('TestSource.srcAsyncObjProp10'),
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
ava_1.serial("Change object's properties and observe them", (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.observe('TestSource.srcAsyncObjProp11'),
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
ava_1.serial('No annotations yassit and observe', (t) => {
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
ava_1.serial('yassit on an old js object without class and annotations', (t) => {
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
ava_1.serial('create a facade on top of stored element', (t) => {
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
        exportedApi_1.observe('facadeDest_fullName'),
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
ava_1.serial('markToUpdate a property that deeply changed', (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.observe('TestSource.markToUpdate17'),
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
ava_1.serial('Fail to create facade with invalid characters', (t) => {
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
ava_1.serial('Interact with property owner via communicate', (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.observe('TestSource.apiSource16'),
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
ava_1.serial('Interact with property owner via older communicate version', (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.observe('TestSource.apiSource18'),
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
ava_1.serial('Fail to change array item from listener', (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.observe('TestSource.arraySource19'),
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
ava_1.serial('Fail to change object property from listener', (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.observe('TestSource.objectSource20'),
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
ava_1.serial('get a yassi property on demand without attaching to a local object', (t) => {
    const test1 = new TestSource();
    const sourceRef = exportedApi_1.yassi.get('TestSource.objectSource21');
    t.deepEqual(sourceRef, test1.objectProp21);
    sourceRef.getIt = false;
    t.is(test1.objectProp21.getIt, true);
});
ava_1.serial('registerMiddleware for before yassit', (t) => {
    exportedApi_1.registerMiddleware('yassit', 'before');
    const test1 = new TestSource();
    t.is(test1.numProp2, 2);
    test1.numProp2 = 444;
    t.log('We should see the number 444 printed to console.');
});
ava_1.serial('register middleware for after yassit', (t) => {
    exportedApi_1.registerMiddleware('yassit', 'after', (proto, key, val) => console.log(`-------${proto.constructor.name}.${key}=${val}-------`));
    const test1 = new TestSource();
    test1.numProp3 = 1234;
    t.is(test1.numProp3, 1234);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIveWFzc2kuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBQXlDO0FBQ3pDLDBCQUEwQjs7Ozs7Ozs7Ozs7QUFHMUIsNkJBQW1DO0FBQ25DLCtCQUFtRDtBQUVuRCwrQ0FBNkY7QUFDN0YsbUNBQXFDO0FBRXJDLGFBQWE7QUFDYixxQkFBcUI7QUFDckIsb0NBQW9DO0FBQ3BDLHlCQUF5QjtBQUN6QixJQUFJO0FBRUosTUFBTSxVQUFVO0lBQWhCO1FBS0UsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBR3JCLGFBQVEsR0FBVyxXQUFXLENBQUM7UUFHL0IsYUFBUSxHQUFRO1lBQ2QsR0FBRyxFQUFFLDhCQUE4QjtTQUNwQyxDQUFDO1FBR0YsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUd4QixlQUFVLEdBQVcsR0FBRyxDQUFDO1FBTXpCLGVBQVUsR0FBUSxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDO1FBZ0J2QyxpQkFBWSxHQUFRO1lBQ2xCLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLE1BQU07WUFDWixTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUFDO1FBR0YsZ0JBQVcsR0FBVyxpQkFBaUIsQ0FBQztRQUd4QyxrQkFBYSxHQUFhLENBQUM7Z0JBQ3pCLEtBQUssRUFBRSxDQUFDO2FBQ1QsQ0FBQyxDQUFDO1FBR0gsZ0JBQVcsR0FBVyxpQkFBaUIsQ0FBQztRQUd4QyxnQkFBVyxHQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUcvQixpQkFBWSxHQUFRO1lBQ2xCLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDTCxDQUFBO1FBR0QsaUJBQVksR0FBUTtZQUNsQixLQUFLLEVBQUUsSUFBSTtT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