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
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const rxjs_1 = require("rxjs");
const store_1 = require("./store");
const yassi_1 = require("./yassi");
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
    yassi_1.yassit('TestSource.srcNumProp1'),
    __metadata("design:type", Number)
], TestSource.prototype, "numProp1", void 0);
__decorate([
    yassi_1.yassit('TestSource.srcNumProp2'),
    __metadata("design:type", Number)
], TestSource.prototype, "numProp2", void 0);
__decorate([
    yassi_1.yassit('TestSource.srcStringProp4'),
    __metadata("design:type", String)
], TestSource.prototype, "strProp4", void 0);
__decorate([
    yassi_1.yassit('TestSource.srcObjProp5'),
    __metadata("design:type", Object)
], TestSource.prototype, "objProp5", void 0);
__decorate([
    yassi_1.yassit('TestSource.srcAsyncNumProp6'),
    __metadata("design:type", Number)
], TestSource.prototype, "asyncProp6", void 0);
__decorate([
    yassi_1.yassit('TestSource.srcAsyncNumProp7'),
    __metadata("design:type", Number)
], TestSource.prototype, "asyncProp7", void 0);
__decorate([
    yassi_1.yassit('TestSource.srcAsyncObjProp8'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp8", void 0);
__decorate([
    yassi_1.yassit('TestSource.srcAsyncObjProp9'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp9", void 0);
__decorate([
    yassi_1.yassit('TestSource.srcAsyncObjProp10'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp10", void 0);
__decorate([
    yassi_1.yassit('TestSource.srcAsyncObjProp11'),
    __metadata("design:type", Object)
], TestSource.prototype, "asyncProp11", void 0);
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
        yassi_1.select('TestSource.srcNumProp1'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "extProp1", void 0);
    __decorate([
        yassi_1.select('TestSource.srcNumProp2'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "extProp2", void 0);
    __decorate([
        yassi_1.select('TestSource.srcStringProp4'),
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
        yassi_1.select('NoKeyFound'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "notFoundProp", void 0);
    __decorate([
        yassi_1.select('TestSource.srcNumProp1'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop1", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    t.is(test1.numProp1, test2.prop1);
    t.is(test2.notFoundProp, undefined);
});
ava_1.default("select A's property from obj B, change it and read it again. Expect to see the change", (t) => {
    class TestDest1 {
    }
    __decorate([
        yassi_1.select('TestSource.srcNumProp1'),
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
        yassi_1.select('TestSource.srcNumProp2'),
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
        yassi_1.select('TestSource.srcObjProp5'),
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
        yassi_1.select('TestSource.srcObjProp5'),
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
        yassi_1.select('TestSource.srcObjProp5'),
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
        yassi_1.observe('TestSource.srcNumProp2'),
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
        yassi_1.select('TestSource.srcAsyncNumProp6'),
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
            yassi_1.yassit('TestSource.srcNumProp2'),
            __metadata("design:type", Object)
        ], TesetDest.prototype, "illegalPropDecorator", void 0);
    }
    catch (e) {
        t.is(e.message, 'Store already has entry with name TestSource.srcNumProp2');
    }
});
ava_1.default('observe object were its property changes using yassi.touch', (t) => {
    class TestDest {
    }
    __decorate([
        yassi_1.observe('TestSource.srcAsyncObjProp8'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop8", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [undefined, { inner1: 5 }, { inner1: 8 }];
    let lastValidatedValue;
    let v = new rxjs_1.BehaviorSubject(null);
    test2.prop8.subscribe((val) => {
        lastValidatedValue = Object.assign({}, val);
        t.deepEqual(val, expectedVals.shift());
        if (expectedVals.length === 0) {
            v.complete();
        }
    });
    // Note that changing the source's property does not trigger the observable.
    // Only when you call touch()
    test1.asyncProp8 = {
        inner1: 5
    };
    t.deepEqual(lastValidatedValue, { inner1: 5 });
    test1.asyncProp8.inner1 = 8;
    t.deepEqual(lastValidatedValue, { inner1: 5 });
    store_1.yassiStore.touch('TestSource.srcAsyncObjProp8');
    return v;
});
ava_1.default('Change an initialized observed object', (t) => {
    class TestDest {
    }
    __decorate([
        yassi_1.observe('TestSource.srcAsyncObjProp9'),
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
        yassi_1.observe('TestSource.srcAsyncObjProp10'),
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
ava_1.default('Use update to change a stored element', (t) => {
    class TestDest {
    }
    __decorate([
        yassi_1.observe('TestSource.srcAsyncObjProp11'),
        __metadata("design:type", Object)
    ], TestDest.prototype, "prop11", void 0);
    const test1 = new TestSource();
    const test2 = new TestDest();
    const expectedVals = [
        undefined,
        { prop1: 'bla' },
        { prop3: 'other' },
        { prop4: 42 },
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
        store_1.yassiStore.update('TestSource.srcAsyncObjProp11', { prop3: 'other' });
        store_1.yassiStore.update('TestSource.srcAsyncObjProp11', { prop4: 42 });
    }, 10);
    return v;
});
ava_1.default('registerMiddleware for before yassit', (t) => {
    yassi_1.registerMiddleware('yassit', 'before');
    const test1 = new TestSource();
    t.is(test1.numProp2, 2);
    test1.numProp2 = 444;
    t.log('We should see the number 444 printed to console.');
});
ava_1.default('register middleware for after yassit', (t) => {
    yassi_1.registerMiddleware('yassit', 'after', (proto, key, val) => console.log(`-------${proto.constructor.name}.${key}=${val}-------`));
    const test1 = new TestSource();
    test1.numProp3 = 1234;
    t.is(test1.numProp3, 1234);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWFzc2kuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIveWFzc2kuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEseUNBQXlDO0FBQ3pDLDBCQUEwQjs7Ozs7Ozs7Ozs7Ozs7QUFHMUIsOENBQXVCO0FBRXZCLCtCQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMsbUNBQW9FO0FBRXBFLGFBQWE7QUFDYixxQkFBcUI7QUFDckIsb0NBQW9DO0FBQ3BDLHlCQUF5QjtBQUN6QixJQUFJO0FBRUosTUFBTSxVQUFVO0lBQWhCO1FBS0UsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBR3JCLGFBQVEsR0FBVyxXQUFXLENBQUM7UUFHL0IsYUFBUSxHQUFRO1lBQ2QsR0FBRyxFQUFFLDhCQUE4QjtTQUNwQyxDQUFDO1FBR0YsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUd4QixlQUFVLEdBQVcsR0FBRyxDQUFDO1FBTXpCLGVBQVUsR0FBUSxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDO0lBc0J6QyxDQUFDO0lBYkMsZ0JBQWdCO1FBQ2QsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNwQyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO2dCQUN0QixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELGdCQUFnQjtRQUNkLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0Y7QUEvQ0M7SUFEQyxjQUFNLENB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