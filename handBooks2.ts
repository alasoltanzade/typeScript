interface Options {
    width: number;
  }
  function configure(x: Options | "auto") {
    // ...
  }
  configure({ width: 100 });
  configure("auto");


//Literal Inference
const obj1 = { counter: 0 };
if (length) {
  obj1.counter = 1;
}


declare function handleRequest(url: string, method: "GET" | "POST"): void;
 
const req = { url: "https://example.com", method: "GET" };
//handleRequest(req.url, req.method);   error


// Change 1:
const req1 = { url: "https://example.com", method: "GET" as "GET" };
handleRequest(req1.url, req1.method as "GET");


const req2 = { url: "https://example.com", method: "GET" } as const;
handleRequest(req2.url, req2.method);


//Just like checking for undefined before using an optional property, we can use narrowing to check for values that might be null
function doSomething(x: string | null) {
    if (x === null) {
      // do nothing
    } else {
      console.log("Hello, " + x.toUpperCase());
    }
  }

//Non-null Assertion Operator (Postfix !)
//removing null and undefined from a type without doing any explicit checking
  function liveDangerously(x?: number | null) {
    // No error
    console.log(x!.toFixed());
  }


//Less Common Primitives

// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);
 
// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;


const firstName = Symbol("name");
const secondName = Symbol("name");
 
//if (firstName === secondName) {
//This comparison appears to be unintentional because the types 'typeof firstName' and 'typeof secondName' have no overlap. Can't ever happen




function padLeft(padding: number | string, input: string): string {
    throw new Error("Not implemented yet!");
  }


function padLeft1(padding: number | string, input: string): string {
    if (typeof padding === "number") { 
      return " ".repeat(padding) + input;  //(parameter) padding: number
    }
    return padding + input;  //(parameter) padding: string
  }


//JavaScript supports a typeof operator which can give very basic information about
//the type of values we have at runtime. "string" "number"  "bigint" "boolean" "symbol" "undefined" "object" "function"


function printAll(strs: string | string[]| null){
    if (typeof strs === "object") {
        for (const s of "objet") {
    //'strs' is possibly 'null'.
          console.log(s);
        }
      } else if (typeof strs === "string") {
        console.log(strs);
      } else {
        // do nothing
      }
}


//Truthiness narrowing
function getUsersOnlineMessage(numUsersOnline: number) {
    if (numUsersOnline) {
      return `There are ${numUsersOnline} online now!`;
    }
    return "Nobody's here. :(";
  }

//all coerce to false
//0 /NaN /"" (the empty string) /0n (the bigint version of zero) /null /undefined


// both of these result in 'true'
Boolean("hello"); // type: boolean, value: true
!!"world"; // type: true,    value: true


//if 
function printPopular(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}


//One last word on narrowing by truthiness is that Boolean negations with ! filter out from negated branches.

function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}


//Equality narrowing
//TypeScript also uses switch statements and equality checks like ===, !==, ==, and != to narrow types.
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();  //(method) String.toUpperCase(): string
    y.toLowerCase();  //(method) String.toLowerCase(): string
  } else {
    console.log(x);   //(parameter) x: string | number
    console.log(y);   //(parameter) y: string | boolean

  }
}


function printEquality(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      for (const s of strs) { //(parameter) strs: string[]
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs); //(parameter) strs: string
    }
  }
}

interface Container {
  value: number | null | undefined;
}
 
function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value);  //(property) Container.value: number
 
    // Now we can safely multiply 'container.value'.
    container.value *= factor;
  }
}

//The in operator narrowing
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}

type Rabit = { jump: () => void };
type Monkey = { walk: () => void };
type Human = { jump?: () => void; walk?: () => void };
 
function move1(animal: Rabit | Monkey | Human) {
  if ("jump" in animal) {
    animal; // (parameter) animal: Rabit | Human
  } else {
    animal;  // (parameter) animal: Monkey | Human
  }
}



//instanceof narrowing
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());//(parameter) x: Date
  } else {
    console.log(x.toUpperCase());//(parameter) x: string
  }
}


//Assignments
let y = Math.random() < 0.5 ? 10 : "hello world!"; //let x: string | number
y = 1;
 
console.log(y); //let y: number
y = "goodbye!";
 
console.log(y); //let x: string


//Control flow analysis
function padingLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

//Using type predicates
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// function getSmallPet(): Fish |Bird
// let pet = getSmallPet();

// const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
// const underWater1: Fish[] = zoo.filter(isFish);
// // or, equivalently
// const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
 
// // The predicate may need repeating for more complex examples
// const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
//   if (pet.name === "sharkey") return false;
//   return isFish(pet);
// });


//Assertion functions
//Discriminated unions
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius! ** 2;
  }
}

interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape1 = Circle | Square;

function getAreashape(shape: Shape) {
  if (shape.kind === "circle") {
   // return Math.PI * shape.radius ** 2; //(parameter) shape: Circle undifinde
  }
}


function getAreaswich(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius! ** 2; //(parameter) shape: Circle
    case "square":
      return shape.sideLength! ** 2; //(parameter) shape: Square
  }
}

//The never type
type ShapeNever = Circle | Square;
 
function getAreaNever(shape: ShapeNever) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}


//Try Adding a new member to the Shape union, will cause a TypeScript error:

interface Triangle {
  kind: "triangle";
  sideLength: number;
}
 
type ShapeTriangle = Circle | Square | Triangle;
 
function getAreaTriangle(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius! ** 2;
    case "square":
      return shape.sideLength! ** 2;
    default:
      //const _exhaustiveCheck: never = shape; 
//Type 'Triangle' is not assignable to type 'never'.
      return ;
  }
}

console.log("6 mordad =)")