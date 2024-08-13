// Object Types
function greetObject(person: { name: string; age: number }) {
  return "Hello " + person.name;
}

interface Person {
  name: string;
  age: number;
}

function greetObject1(person: Person) {
  return "Hello " + person.name;
}

// Optional Properties
interface PaintOptions {
  shape: string; // Corrected from `{ Shape }` to `string` for proper representation
  xPos?: number;
  yPos?: number;
}

function paintShape1(opts: PaintOptions) {
  // Implementation can go here
}

// Example of a shape object that must be defined based on context
// const shape = getShape(); // Uncomment and define getShape() as needed
// paintShape1({ shape });
// paintShape1({ shape, xPos: 100 });
// paintShape1({ shape, yPos: 100 });
// paintShape1({ shape, xPos: 100, yPos: 100 });

function paintShape3(opts: PaintOptions) {
  let xPos = opts.xPos !== undefined ? opts.xPos : 0; // Explicitly handle undefined
  let yPos = opts.yPos !== undefined ? opts.yPos : 0; // Explicitly handle undefined
}

function paintShape4(opts: PaintOptions) {
  let xPos1 = opts.xPos === undefined ? 0 : opts.xPos;
  let yPos2 = opts.yPos === undefined ? 0 : opts.yPos;
}

function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);
  console.log("y coordinate at", yPos);
}

// Example Usage
// PaintShape expects a valid shape object
// paintShape({ shape: "circle" }); // Uncomment and define shape as needed

// Properties can also be marked as readonly for TypeScript
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  console.log(`prop has the value '${obj.prop}'.`);
  // obj.prop = "hello"; // This line is intentionally commented out; it will cause a compile-time error
}

interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++; // This is acceptable, as we modify the age property of the resident
}

function evict(home: Home) {
  // home.resident = { name: "Victor the Evictor", age: 42 }; This line is intentionally commented out; it will cause a compile-time error
}

// Managing expectations of what readonly implies
interface PersonDetails {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: PersonDetails = {
  name: "Ala soltanzade",
  age: 42,
};

let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'

// Using mapping modifiers to allow dynamic properties
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["Hello", "World"]; // Example initialization
const secondItem = myArray[1]; // Correctly gets item

interface NumberDictionary {
  [index: string]: number;
  length: number; // ok
  // name: string; // Uncommenting this would cause an error
}

interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}

interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArrayReadonly: ReadonlyStringArray = ["ReadOnly", "Array"];
// myArrayReadonly[2] = "Mallory"; // Uncommenting this will cause a compile-time error


//Excess Property Checks
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any; // Allow custom properties
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}

let mySquare = createSquare({ color: "red", width: 100 });
// Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?

let squareOptions = { color: "red", width: 100 }; // Correctly defined
let mySquare2 = createSquare(squareOptions);


//Extending Types
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string; // Inherits from BasicAddress
}

interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle { }

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};

function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: "blue", radius: 42 });

// oops
// draw({ color: "red", raidus: 42 }); // Uncommenting this will cause a compile-time error: "Did you mean 'radius'?"


//Interfaces vs. Intersections
interface PersonOne {
  name: string;
}

interface PersonTwo {
  name: number;
}

// This creates a never type as it's incompatible
type Staff = PersonOne & PersonTwo;

// declare const staffer: Staff; // This would cause a compile-time error



// Generic Object Types  
interface Box {
  contents: any;
}

let x: Box = {
  contents: "hello world",
};

// we could check 'x.contents'
if (typeof x.contents === "string") {
  console.log(x.contents.toLowerCase());
}

// or we could use a type assertion
console.log((x.contents as string).toLowerCase());


interface NumberBox {
  contents: number;
}

interface StringBox {
  contents: string;
}

interface BooleanBox {
  contents: boolean;
}

//so we can create different func like this
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
  box.contents = newContents;
}

interface Box1<Type> {
  contents: Type;
}
interface StringBox {
  contents: string;
}

let boxA: Box1<string> = { contents: "hello" };
boxA.contents;

let boxB: StringBox = { contents: "world" };
boxB.contents;  //boxA - boxB are string

interface Apple {

}
// Same as '{ contents: Apple }'.
type AppleBox = Box1<Apple>;

function setContents3<Type>(box: Box1<Type>, newContents: Type) {
  box.contents = newContents;
}

//The Array Type

function doSomething4(value: Array<string>) {
  // ...
}

let myArray5: string[] = ["hello", "world"];

// either of these work!
doSomething4(myArray5);
doSomething4(new Array("hello", "world"));


interface Array7<type> {
  length: number;
  pop(): TypeError | undefined;  // Removes the last element from an array and returns it.
  push(...item)
}


//the readonly array type
function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // ...but we can't mutate 'values'.
  // values.push("hello!");
}

const roArray: ReadonlyArray<string> = ["red", "green", "blue"];


let k: readonly string[] = [];
let y: string[] = [];

k = y;
// y = x;
// The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'.



//Tuple Types
type StringNumberPair = [string, number];


function doSomethingf(pair: [string, number]) {
  const a = pair[0];  //const a : string
  const b = pair[1];
  doSomethingf(["hi", 3432]);
}



function doSomething5(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;

  console.log(inputString);
  // const inputString: string

  console.log(hash);
  // const hash: number
}


interface StringNumberPair8 {
  // specialized properties
  length: 2;
  0: string;
  1: number;

  // Other 'Array<string | number>' members...
  slice(start?: number, end?: number): Array<string | number>;
}

type either = [number, number, number?];
function setCoordinate(coord: either) {
  const [x, y, z] = coord;  //const z: number | undefined
  console.log(`Provided coordinates had ${coord.length} dimensions`);
}

type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

// StringNumberBooleans describes a tuple whose first two elements are string and number respectively, but which may have any number of booleans following.
// StringBooleansNumber describes a tuple whose first element is string and then any number of booleans and ending with a number.
// BooleansStringNumber describes a tuple whose starting elements are any number of booleans and ending with a string then a number.

const a: StringNumberBooleans = ["hello", 1];
const b: StringNumberBooleans = ["beautiful", 2, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];

function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
}
//equivalent to:
function readButtonInput1(name: string, version: number, ...input: boolean[]) {
  // ...
}


//readonly Tuple Types
function doSomething9(pair: readonly [string, number]) {
  let point = [3, 4] as const;
}

function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}

// 23 mordad :__)