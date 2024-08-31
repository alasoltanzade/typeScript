//Enums
//Enums allow a developer to define a set of named constants.
//TypeScript provides both numeric and string-based enums.

//یه سری مقادیر ثابت و غیر قابل تغییر رو به یک نام اختصاص میدیم که میتونه عدد یا رشته باشه

//Numeric enums
enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}
enum UserTest {
    No = 0,
    Yes = 1,
}
function respond(recipient: string, message: UserTest): void {
    // ...
}
respond("Princess Amir", UserTest.Yes);


//String enums
enum DirectionString {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}


//Heterogeneous enums
//can be mixed with string and numeric members
//has a value associated with it which can be either constant or computed.
enum mix {
    No = 0,
    Yes = "Yes",
}

enum E {
    X,
    Foo,
    Bar,
}
enum E01 {
    X,
    Y,
    Z,
}

enum E02 {
    A = 1,
    B,
    C,
}

enum FileAccess {
    // constant members
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // computed member
    G = "123".length,
}

//Union enums and enum member types
enum Shape01 {
    Circle,
    Squere,
}

interface Circle {
    kind1: Shape01.Circle;
    radius: number;
}

interface Squere {
    kind1: Shape01.Squere;
    sideLength: number;
}

let Circle = {
    kind1: Shape01.Circle,
    radius: 100,
}

function f(x: E) {
    if (x !== E.Foo) {
        //..
    }
}

//Enums at runtime
enum Test01 {
    X,
    Y,
    Z,
}
function f(obj: { X: number }) {
    return obj.X;
}
// Works, since 'E' has a property named 'X' which is a number.
f(Test01);


//Enums at compile time
enum LogLevel {
    ERROR,
    WARN,
    INFO,
    DEBUG,
}
type LogLevelStrings = keyof typeof LogLevel;
function printImportant(key: LogLevelStrings, message: string) {
    const num = LogLevel[key];
    if (num <= LogLevel.WARN) {
        console.log("Log level key is:", key);
        console.log("Log level value is:", num);
        console.log("Log level message is:", message);
    }
}
printImportant("ERROR", "This is a message");


//Reverse mappings
enum Enum {
    A,
}
let aaa = Enum.A;
let nameOfA = Enum[aaa]; // "A"

//JavaScript
// var Enum;
// (function (Enum) {
//     Enum[Enum["A"] = 0] = "A";
// })(Enum || (Enum = {}));
// let a = Enum.A;
// let nameOfA = Enum[a]; // "A"


//const enum 
//Const enums are defined using the const modifier on our enums
const enum Enum1 {
    A = 1,
    B = A * 2,
}

let directions = [
    Direction.Up,
    Direction.Down,
    Direction.Left,
    Direction.Right,
];


//Ambient enums
declare enum Enum2 {
    A = 1,
    B,
    C = 2,
}



//Objects vs Enums
const enum EDirection {
    Up,
    Down,
    Left,
    Right,
}

const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
} as const;

EDirection.Up; //(enum member) EDirection.Up = 0
ODirection.Up; //(property) Up: 0

// Using the enum as a parameter
function walk(dir: EDirection) { }

// It requires an extra line to pull out the values
type ODirection = typeof ODirection[keyof typeof ODirection];
function run(dir: ODirection) { }

walk(EDirection.Left);
run(ODirection.Right);

