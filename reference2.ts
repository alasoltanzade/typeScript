//Decorators
//A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. 

function test(target) {//یک دکوراتور عمومی که به یک متد یا کلاس اشاره میکنه
    // do something with 'target' ...
}



//to customize how a decorator is applied 
function car(value: string) { // یه صورت فانکشن یه کلاس برمیگردونه
    return function (target) {
        //do something //دکوراتور با پارامتر خاصی که داره و بهش پاس دادن یع کار جدید میکنه
    };
}



//Multiple decorators can be applied to a declaration
// @d @u x
function first() {  //دو دکوراتور که می‌توانند به متدها متصل میشن
    console.log("first(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("first(): called");
    };
}
function second() {
    console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("second(): called");
    };
}
class ExampleClass { //این دوتا دکوراتور به متد اضاقه شدن
    @first()
    @second()
    method() { }//وقتی متد فراخوانی بشه اون دوتا هم خونده میشن
}




//Class Decorators  به کلاس متصل میشه و رقتار کلاس رو محدود میکته
//can be used to observe, modify, or replace a class definition
@sealed
class BugReportsealed {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }
}


function sealed(constructor: Function) {  //following function declaration
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}





// how to override the constructor to set new defaults??
function reporClassDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        reportingURL = "www...";
    };
}

@reporClassDecorator
class BugReport {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }
}
const bug = new BugReport("Needs dark mode");
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"





//Method Decorators
//can be used to observe, modify, or replace a method definition
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}

function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}






//Accessor Decorators
class Pointt {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() {
        return this._x;
    }

    @configurable(false)
    get y() {
        return this._y;
    }
}

function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}




//Property Decorators
// class temp {
//     @format("Hello, %s")
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }
//     tmp() {
//         let formatString = getFormat(this, "greeting");
//         return formatString.replace("%s", this.greeting);
//     }
// }

// import "reflect-metadata";
// const formatMetadataKey = Symbol("format");
// function format(formatString: string) {
//     return Reflect.metadata(formatMetadataKey, formatString);
// }
// function getFormat(target: any, propertyKey: string) {
//     return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
// }






//Metadata
import "reflect-metadata";

class Point {
    constructor(public x: number, public y: number) { }
}

class Line {
    private _start: Point;
    private _end: Point;

    @testTmp
    set start(value: Point) {
        this._start = value;
    }

    get start() {
        return this._start;
    }

    @testTmp
    set end(value: Point) {
        this._end = value;
    }

    get end() {
        return this._end;
    }
}

function testTmp<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
    let set = descriptor.set!;

    descriptor.set = function (value: T) {
        // let type = @tadata("design:type", target, propertyKey);

        // if (!(value instanceof type)) {
        //     throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}.`);
        // }

        set.call(this, value);
    };
}

const line = new Line()
line.start = new Point(0, 0)

// @ts-ignore
// line.end = {}

// Fails at runtime with:
// > Invalid type, got object not Point

class Line2 {
    private _start: Point;
    private _end: Point;
    @testTmp
    // @Reflect.metadata("design:type", Point)
    set start(value: Point) {
        this._start = value;
    }
    get start() {
        return this._start;
    }
    @testTmp
    // @Reflect.metadata("design:type", Point)
    set end(value: Point) {
        this._end = value;
    }
    get end() {
        return this._end;
    }
}