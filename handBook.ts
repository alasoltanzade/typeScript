// on 'message' and then calling it
//message.toLowerCase();
// Calling 'message'
//message();
const message = 'Hello world';

message;
//For some values, such as the primitives string and number, we can identify their type at runtime using the typeof operator. But for other things like functions, there’s no corresponding runtime mechanism to identify their types. 
function fn(x){
    return x.flip();
}
//only work if given an object with a callable flip property

const user = {
    name: "Ala",
    age: 21,
  };
user.name;

const announcement = "Hello World!";

// We probably meant to write this...
announcement.toLocaleLowerCase();
announcement.toLocaleUpperCase();

function flipCoin() {
    // Meant to be Math.random()
    return Math.random();
//Operator '<' cannot be applied to types '() => number' and 'number'.
  }

const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
console.log(11)
} else if (value === "a") {  //value ==='b' is wrong
//This comparison appears to be unintentional because the types '"a"' and '"b"' have no overlap.

}

//import express from "express";
//const app = express();
 
//app.get("/", function (req, res) {
//  res.sendfile()
//}),

function test (){
    console.log(32)
}

console.log("Hello Sweeti")

// This is an industrial-grade general-purpose greeter function:
function greet(person, date) {
    console.log(`Hello ${person}, today is ${date}!`);
  }
   
greet("Ala" , 2024);

function greet1(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
  }

greet1 ("Amir" , new Date())

"use strict";
function greet2(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
greet2("Mina", new Date());


//`Hello ${person}, today is ${date.toDateString()}!`;
//"Hello ".concat(person, ", today is ").concat(date.toDateString(), "!");

//noImplicitAny : using any often defeats the purpose of using TypeScript in the first place

//strictNullChecks : makes handling null and undefined more explicit

let obj: any = { x: 0 };
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;

let myName: string = "Taylor";
let lastName = "Swift";

// Parameter type annotation
function greet4(name: string) {
    console.log("Hello, " + name.toUpperCase() + "!!");
  }

//Return Type Annotations
function getFavoriteNumber(): number {
    return 26;
}

//Functions Which Return Promises
async function getPromisNumber(): Promise<number> {
    return 26;
  }

 //Anonymous Functions

 const names = ["Ala", "Elahe", "Mlk"];

// Contextual typing for function - parameter s inferred to have type string
  names.forEach(function (s) {
    console.log(s.toUpperCase());
  });

// Contextual typing also applies to arrow functions
  names.forEach((s) => {
    console.log(s.toUpperCase());
  });


// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }
  printCoord({ x: 3, y: 7 });


//Optional Properties
function printName(obj: { first: string; last?: string }) {
  }

  printName({ first: "selina" });
  printName({ first: "post", last: "malone" });


  function printName1(obj: { first: string; last?: string }) {
   // Error - might crash if 'obj.last' wasn't provided!
   //console.log(obj.last.toUpperCase()); error
   //'obj.last' is possibly 'undefined'.
    if (obj.last !== undefined) {
      // OK
      console.log(obj.last.toUpperCase());
    }

    // A safe alternative using modern JavaScript syntax:
    console.log(obj.last?.toUpperCase());
  }

//Defining a Union Type
function printId(id: number | string) {
    console.log("Your ID is: " + id);
  }
  // OK
  printId(101);
  // OK
  printId("202");
  // Error
//  printId({ myID: 22342 });

function printId1(id: number | string) {
    if (typeof id === "string") {
      // In this branch, id is of type 'string'
      console.log(id.toUpperCase());
    } else {
      // Here, id is of type 'number'
      console.log(id);
    }
  }

  //use a function like Array.isArray:
  function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
      // Here: 'x' is 'string[]'
      console.log("Hello, " + x.join(" and "));
    } else {
      // Here: 'x' is 'string'
      console.log("Welcome lone traveler " + x);
    }
  }

// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
    return x.slice(0, 3);
  }  

//Type Aliases
type Point = {
    x: number;
    y: number;
  };
   
  // Exactly the same as the earlier example
  function printCoord1(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }

  printCoord({ x: 100, y: 100 });

  type ID = number | string;



  type UserInputSanitizedString = string;
 
function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitizeInput(str);
}


// Create a sanitized input
//let userInput = sanitizeInput(getInput());

// Can still be re-assigned with a string though
//userInput = "new input";


interface Point1{
    x: number;
    y: number;
  }
   
  function printCoord2(pt: Point1) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }

  printCoord({ x: 100, y: 100 });



/*
Extending an interface

  interface Animal {
    name: string;
  }
  
  interface Bear extends Animal {
    honey: boolean;
  }
  
  const bear = getBear();
  bear.name;
  bear.honey;


Extending a type via intersections

  type Animal = {
    name: string;
  }
  
  type Bear = Animal & { 
    honey: boolean;
  }
  
  const bear = getBear();
  bear.name;
  bear.honey;
*/



const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas1 = <HTMLCanvasElement>document.getElementById("main_canvas");

//const x = "hello" as number;

//const a = expr as any as T;


let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;

const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;

function printText(s: string, alignment: "left" | "right" | "center") {
}
printText("Hello, world", "left");


function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
  }

console.log("4 mordad =)")