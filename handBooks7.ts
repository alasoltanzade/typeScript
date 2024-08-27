//Classes

class Point {//class members
    x: number;
    y: number;
}

const pt = new Point();
pt.x = 0;
pt.y = 0;
console.log(`${pt.x}, ${pt.y}`);

class GoodGreeter {
    name: string;

    constructor() {
        this.name = "hello";
    }
}

//readonly
class Greeter {
    readonly name: string = "world";

    constructor(otherName?: string) {
        if (otherName !== undefined) {
            this.name = otherName;
        }
    }

    err() {
        //   this.name = "not ok";//Cannot assign to 'name' because it is a read-only property.
    }
}
const g = new Greeter();
//   g.name = "also not ok";//Cannot assign to 'name' because it is a read-only property.



//constructors
class PointConstructor {
    x: number = 0;
    y: number = 0;

    // Constructor overloads
    constructor(x: number, y: number);
    constructor(xy: string);
    constructor(x: string | number, y: number = 0) {
    }
}

//Just as in JavaScript, if you have a base class, you’ll need to call super(); in your constructor body before using any this. members:

class Base {
    k = 4;
}

class Derived extends Base {
    constructor() {
        // Prints a wrong value in ES5; throws exception in ES6
        //   console.log(this.k);
        //'super' must be called before accessing 'this' in the constructor of a derived class.
        super();
    }
}

//methods
class PointMethods {
    x = 10;
    y = 10;

    scale(n: number): void {
        this.x *= n;
        this.y *= n;
    }
}


//Getter Setters
class C {
    _length = 0;
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = value;
    }
}

class Thing {
    _size = 0;

    get size(): number {
        return this._size;
    }

    set size(value: string | number | boolean) {
        let num = Number(value);

        // Don't allow NaN, Infinity, etc

        if (!Number.isFinite(num)) {
            this._size = 0;
            return;
        }
        this._size = num;
    }
}


//index Signatures
class MyClass {
    [s: string]: boolean | ((s: string) => boolean);

    check(s: string) {
        return this[s] as boolean;
    }
}

//Class Heritage
//implements Clauses
interface Pingable {
    ping(): void;
}

class Sonar implements Pingable {
    ping() {
        console.log("ping!");
    }
}

interface checkable {
    check(name: string): boolean;
}

//extends clauses
class Animal {
    move() {
        console.log("Moving along!");
    }
}

class Dog extends Animal {
    woof1(times: number) {
        for (let i = 0; i < times; i++) {
            console.log("woof!");
        }
    }
}

const u = new Dog();
// Base class method
u.move();
// Derived class method
u.woof1(3);

//Overriding Methods
class Base2 {
    greet() {
        console.log("Hello, world!");
    }
}

class Derived4 extends Base2 {
    greet(name?: string) {
        if (name === undefined) {
            super.greet();
        } else {
            console.log(`Hello, ${name.toUpperCase()}`);
        }
    }
}

const d = new Derived4();
d.greet();
d.greet("reader");


//Alias the derived instance through a base class reference
// const b: Base2 = d;
//No problem
// b.greet();

// const d: Base2 = new Derived();
// Crashes because "name" will be undefined
// b.greet();


//Type-only Field Declarations
interface Animal {
    dateOfBirth: any;
}

interface Dog extends Animal {
    breed: any;
}

class AnimalHouse {
    resident: Animal;
    constructor(animal: Animal) {
        this.resident = animal;
    }
}

class DogHouse extends AnimalHouse {
    // Does not emit JavaScript code,
    // only ensures the types are correct
    declare resident: Dog;
    constructor(dog: Dog) {
        super(dog);
    }
}


//Initialization Order
class BaseOrder {
    name = "BaseOrder";
    constructor() {
        console.log("My name is " + this.name);
    }
}

class DerivedOrder extends BaseOrder {
    name = "derived";
}// Prints "BaseOrder", not "DerivedOrder"
const du = new DerivedOrder();

// The base class fields are initialized
// The base class constructor runs
// The derived class fields are initialized
// The derived class constructor runs


//Inheriting Built-in Types
class MsgError extends Error {
    constructor(m: string) {
        super(m);
    }
    sayHello() {
        return "hello " + this.message;
    }
}

class MsgError1 extends Error {
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, MsgError1.prototype);
    }

    sayHello() {
        return "hello " + this.message;
    }
}

//Member Visibility
class GreeterMember {
    public greet() {
        console.log("Hello, " + this.getName());
    }
    protected getName() {
        return "hi";
    }
}

class SpecialGreeter extends GreeterMember {
    public howdy() {
        // OK to access protected member here
        console.log("Howdy, " + this.getName());
    }
}
const g1 = new SpecialGreeter();
//   g1.greeeeet(); // OK

//Exposure of protected members
class Baseprotected {
    protected m = 10;
}
class Derivedprotected extends Baseprotected {
    // No modifier, so default is 'public'
    m = 15;
}
const d2 = new Derivedprotected();
console.log(d2.m); // OK

//private
class A {
    private x = 10;

    public sameAs(other: A) {
        // No error
        return other.x === this.x;
    }
}

class MySafe {
    private secretKey = 12345;
}
// In a JavaScript file...
const s = new MySafe();
// Will print 12345
console.log(s["secretKey"]);

class barkAmount {
    #barkAmount = 0;
    personality = "happy";

    constructor() { }
}


class MyClass1 {
    static x = 0;
    static printX() {
        console.log(MyClass1.x);
    }
}
console.log(MyClass1.x);
MyClass1.printX();


// Unnecessary "static" class
class MyStaticClass {
    static doSomething() { }
}

// Preferred (alternative 1)
function doSomething() { }

// Preferred (alternative 2)
const MyHelperObject = {
    dosomething() { },
};

//static Blocks in Classes
class Foo {
    static #count = 0;

    get count() {
        return Foo.#count;
    }

    static {
        try {
            // const lastInstances = loadLastInstances();
            // Foo.#count += lastInstances.length;
        }
        catch { }
    }
}


//Generic Classes
class Box<Type> {
    contents: Type;
    constructor(value: Type) {
        this.contents = value;
    }
}
const b = new Box("hello!");


//this at Runtime in Classes
class MyClassthis {
    name = "MyClassthis";
    getName() {
        return this.name;
    }
}
const c = new MyClassthis();
const obj = {
    name: "obj",
    getName: c.getName,
};

// Prints "obj", not "MyClassthis"
console.log(obj.getName());


//Arrow Functions
class MyClassArrow {
    name = "MyClassArrow";
    getName = () => {
        return this.name;
    };
}
const cq = new MyClassArrow();
const gq = cq.getName;
// Prints "MyClassArrow" instead of crashing
console.log(gq());

//this parameters
class Boxe {
    contents: string = "";
    set(value: string) {
        //   (method) Box.set(value: string): this
        this.contents = value;
        return this;
    }
}

class ClearableBox extends Boxe {
    clear() {
        this.contents = "";
    }
}

const a = new ClearableBox();
const bw = a.set("hello");

//   const bw: ClearableBox


//this -based type guards
class FileSystemObject {
    isFile(): this is FileRep {
        return this instanceof FileRep;
    }
    isDirectory(): this is Directory {
        return this instanceof Directory;
    }
    isNetworked(): this is Networked & this {
        return this.networked;
    }
    constructor(public path: string, private networked: boolean) { }
}

class FileRep extends FileSystemObject {
    constructor(path: string, public content: string) {
        super(path, false);
    }
}

class Directory extends FileSystemObject {
    children: FileSystemObject[];
}

interface Networked {
    host: string;
}

const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");

if (fso.isFile()) {
    fso.content;    //   const fso: FileRep
} else if (fso.isDirectory()) {
    fso.children;    // const fso: Directory
} else if (fso.isNetworked()) {
    fso.host;    // const fso: Networked & FileSystemObject
}


//Class Expressions
const someClass = class <Type> {
    content: Type;
    constructor(value: Type) {
        this.content = value;
    }
};

const m = new someClass("Hello, world"); //const m: someClass<string>


//Constructor Signatures
class Pointtt {
    createdAt: number;
    x: number;
    y: number
    constructor(x: number, y: number) {
        this.createdAt = Date.now()
        this.x = x;
        this.y = y;
    }
}
type PointInstance = InstanceType<typeof Point>

function moveRight(point: PointInstance) {
    point.x += 5;
}

const point = new Pointtt(3, 4);
moveRight(point);
point.x; // => 8


//Relationships Between Classes
class Point1 {
    x = 0;
    y = 0;
}

class Point2 {
    x = 0;
    y = 0;
}

// OK
const pw: Point1 = new Point2();

class Person {
    name: string;
    age: number;
}

class Employee {
    name: string;
    age: number;
    salary: number;
}

// OK
const p: Person = new Employee();


class Empty {}
 
function fn(x: Empty) {
  // can't do anything with 'x', so I won't
}
 
// All OK!
fn(window);
fn({});
fn(fn);