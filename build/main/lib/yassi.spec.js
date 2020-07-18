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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const rxjs_1 = require("rxjs");
const exportedApi_1 = __importStar(require("./exportedApi"));
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
ava_1.default('object instance with Yassi but works as without', (t) => {
    const test1 = new TestSource();
    t.is(test1.numProp1, undefined);
    t.is(test1.numProp2, 2);
    t.is(test1.numProp3, 3);
    t.is(test1.strProp4, 'Not Again');
});
ava_1.default("object A's property is selected by object B", (t) => {
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
ava_1.default('select property that does not exists in the store and expect undefined follow js behaviour', (t) => {
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
ava_1.default("select A's property from obj B, change it on A and read it again on B. Expect to see the change", (t) => {
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
ava_1.default('change to a selected property throw error', (t) => {
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
ava_1.default("yassit A's property of type object and read it on object B", (t) => {
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
ava_1.default("yassit A's property of type object is by reference", (t) => {
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
ava_1.default("change selected property of type object throw error", (t) => {
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
ava_1.default('observe a store property using @observe and get the pushed values immediatly', (t) => {
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
ava_1.default("change A's property asynchronously and read the change", async (t) => {
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
ava_1.default('yassit on existing entry name throw exception', (t) => {
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
        t.is(e.message, 'Store already has entry with name TestSource.srcNumProp2');
    }
});
ava_1.default('observe an array changes', (t) => {
    class TestDest {
    }
    __decorate([
        exportedApi_1.observe('TestSource.srcArrayProp12'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop12", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedValues = [undefined, [1], [1, 2]];
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
ava_1.default('observe object were its property changes', (t) => {
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
ava_1.default('Change an initialized observed object', (t) => {
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
ava_1.default('Change an uninitialized observed object', (t) => {
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
ava_1.default("Change object's properties and observe them", (t) => {
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
ava_1.default('No annotations yassit and observe', (t) => {
    class TestDest {
    }
    const test1 = new TestSource();
    const test2 = new TestDest();
    exportedApi_1.default.yassit('TestSource.noAnnotationProp13', test1, 'noAnnotationProp13');
    exportedApi_1.default.observe('TestSource.noAnnotationProp13', test2, 'prop13');
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
ava_1.default('registerMiddleware for before yassit', (t) => {
    exportedApi_1.registerMiddleware('yassit', 'before');
    const test1 = new TestSource();
    t.is(test1.numProp2, 2);
    test1.numProp2 = 444;
    t.log('We should see the number 444 printed to console.');
});
ava_1.default('register middleware for after yassit', (t) => {
    exportedApi_1.registerMiddleware('yassit', 'after', (proto, key, val) => console.log(`-------${proto.constructor.name}.${key}=${val}-------`));
    const test1 = new TestSource();
    test1.numProp3 = 1234;
    t.is(test1.numProp3, 1234);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIveWFzc2kuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBQXlDO0FBQ3pDLDBCQUEwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRzFCLDhDQUF1QjtBQUN2QiwrQkFBbUQ7QUFFbkQsNkRBQWlGO0FBRWpGLGFBQWE7QUFDYixxQkFBcUI7QUFDckIsb0NBQW9DO0FBQ3BDLHlCQUF5QjtBQUN6QixJQUFJO0FBRUosTUFBTSxVQUFVO0lBQWhCO1FBS0UsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBR3JCLGFBQVEsR0FBVyxXQUFXLENBQUM7UUFHL0IsYUFBUSxHQUFRO1lBQ2QsR0FBRyxFQUFFLDhCQUE4QjtTQUNwQyxDQUFDO1FBR0YsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUd4QixlQUFVLEdBQVcsR0FBRyxDQUFDO1FBTXpCLGVBQVUsR0FBUSxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDO0lBMEJ6QyxDQUFDO0lBYkMsZ0JBQWdCO1FBQ2QsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNwQyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO2dCQUN0QixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELGdCQUFnQjtRQUNkLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0Y7QUFuREM7SUFEQyxvQkFBTSxDQUFDLHdC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