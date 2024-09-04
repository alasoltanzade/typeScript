//Variable Declaration
//giving a name to a box where you can store a value (like a number, a word, or an object)
//You can then use this name later to get or change the value in that box

//Declaring a Number Variable
let age: number = 25;


//Declaring a String Variable
let firstName1: string = "Alice";


//Declaring a Boolean Variable
let isStudent: boolean = true;


//Declaring an Array of Numbers
let scores: number[] = [85, 90, 78];


//Declaring an Object
let person1: { name: string, age: number } = { name: "Bob", age: 25 };


//Using const for a constant variable
const pi: number = 3.14;


//Declaring a Variable Without Initializing
let lastName6: string;
lastName6 = "Soltanzade";


//Declaring a Variable with Type Inference
let city = "New York";


//Declaring a Union Type Variable
let id: number | string = 101;
id = "A101"; // Later, it's valid to assign a string to the same variable


//Declaring a Function with Typed Parameters and Return Type
function addss(a: number, b: number): number {
    return a + b;
}
let sums: number = addss(5, 10);







var a01 = 10;

function a02() {  //declare a variable inside of a function
    var a03 = "hello world";
    return a03;
}


function a04() { //access those same variables within other functions
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    };
}
var a05 = a04();
a05(); // returns '11'


function a06() {
    var a = 1;
    a = 2;
    var b = a07();
    a = 3;
    return b;
    function a07() {
        return a;
    }
}
a06(); // returns '2'


//scoping rules
function a08(a09: boolean) {
    if (a09) {
        var x = 10;
    }
    return x;
}

a08(true);  // returns '10'
a08(false); // returns 'undefined'


function a10(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
    return sum;
}

/*Variable capturing quirks
for (var i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i);
    }, 100 * i);
}
*/

//let  declarations
function a11(input: boolean) {
    let a = 100;
    if (input) { // Still okay to reference 'a'
        let b = a + 1;
        return b;
    }
    // Error: 'b' doesn't exist here
    return b;
}


//Variables declared in a catch clause also have similar scoping rules.
try {
    throw "oh no!";
} catch (e) {
}


let a12;
a12++;


function a13() {
    return aax;
}

a13();
let aax;

//Re-declarations and Shadowing
function a14(x) {
    var x;
    var x;
    if (true) {
        var x;
    }
}

let a15 = 10;
// let a15 = 20; error

function a16() {
    let x = 100;
}

function a17(condition, x) {
    if (condition) {
        let x = 100;
        return x;
    }
    return x;
}
a17(false, 0); // returns '0'
a17(true, 0); // returns '100'


//Block-scoped variable capturing

function a18() {
    let a19;
    if (true) {
        let z = "sea";
        a19 = function () {
            return z;
        };
    }
    return a19();
}


//const declaraton
const a20 = 9;
const kitty = {
    name: "Aurora",
    numLives: a20,
};
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;




//Array destructuring
let input = [1, 2];
let [first, second] = input;
// console.log(first); // outputs 1
// console.log(second); // outputs 2

// swap variables
[first, second] = [second, first];


function f([first, second]: [number, number]) { //with parameters to a function
}
f([1, 2]);

let [firsts, ...rest] = [1, 2, 3, 4];
// console.log(firsts); // outputs 1
// console.log(rest); // outputs [ 2, 3, 4 ]


let [, seconds, , fourths] = [1, 2, 3, 4];
// console.log(seconds); 2
// console.log(fourths); 4


let tuple: [number, string, boolean] = [7, "hello", true];
let [at, bt, ct] = tuple; // at: number, bt: string, ct: boolean

let [ac] = tuple; // a: number
let [, bc] = tuple; // b: string



//Object destructuring
let o = {
    a9: "foo",
    b9: 12,
    c9: "bar",
};
let { a9, b9 } = o;


//Default values
function a24(a25: { a: string; b?: number }) {
    let { a, b = 90 } = a25;
}


//Function declarations
type Css = { a: string; b?: number };
function f({ a, b }: Css): void {
    // ...
}

function f({ a = "", b = 0 } = {}): void {
    // ...
}
f();


function f({ a, b = 0 } = { a: "" }): void {
    // ...
}
f({ a: "yes" }); // ok, default b = 0
f(); // ok, default to { a: "" }, which then defaults b = 0
//   f({}); // error, 'a' is required if you supply an argument


//spread
let a26 = [1, 2];
let a27 = [3, 4];
let a28 = [0, ...a26, ...a27, 5];


let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
let search2 = { food: "rich", ...defaults };


class A30 {
    p = 12;
    m() { }
}
let a30 = new A30();
let clone = { ...a30 };
clone.p; // ok
// clone.m(); // error!


//using declarations
function f() {
    using x = new F();
    doSomething();
}

/*
function f() {
    const x = new C();
    try {
        doSomethingWith(x);
    }
    finally {
        x[Symbol.dispose]();
    }}

{   using file = await openFile();
    file.write(text);
    doSomethingThatMayThrow();
  } // `file` is disposed, even if an error is thrown

  function f() {
  using activity = new TraceActivity("f"); // traces entry into function
  // ...
} // traces exit of function
*/



//null undefined
{
    using x = b ? new C() : null;
    try {
        // ...
    }
    finally {
        // x?.[Symbol.dispose]();
    }
}

//Defining a disposable resource
// from the default lib:
// interface Disposable {
//     [Symbol.dispose](): void;
// }
// // usage:
// class TraceActivity implements Disposable {
//     readonly name: string;
//     constructor(name: string) {
//         this.name = name;
//         console.log(`Entering: ${name}`);
//     }
//     [Symbol.dispose](): void {
//         console.log(`Exiting: ${name}`);
//     }
// }
// function f() {
//     using _activity = new TraceActivity("f");
//     console.log("Hello world!");
// }

