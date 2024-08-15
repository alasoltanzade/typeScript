//type Manipulation

//Typeof Type Operator

console.log(typeof "Hello world");// Prints "string"
let s = "hello";
let n: typeof s; //n : string

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>; //type K = boolean

function f() {
    return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>; //type P = {x: number;    y: number;}

// Meant to use = ReturnType<typeof msgbox>
// let shouldContinue: typeof msgbox("Are you sure you want to continue?");



//Indexed Access Types
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"]; //type Age = number
type I1 = Person["age" | "name"]; //type I1 = string | number
type I2 = Person[keyof Person]; //type I2 = string | number | boolean
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName]; //type I3 = string | boolean

const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];

type Person1 = typeof MyArray[number]; //type person1 = name: string , age: number
type Age2 = Person["age"];

type key = "age";
type Age3 = Person[key];





//Conditional Types
interface Animal {
    live(): void;
}
interface Dog extends Animal {
    woof(): void;
}
type Example1 = Dog extends Animal ? number : string; //   type Example1 = number
type Example2 = RegExp extends Animal ? number : string; //type Example2 = string


interface IdLabel {
    id: number /* some fields */;
}
interface NameLabel {
    name: string /* other fields */;
}
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw "unimplemented";
}

type NameOrId<T extends number | string> = T extends number
    ? IdLabel
    : NameLabel;

function createLabel1<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented";
}
let a = createLabel("typescript"); //   let a: NameLabel
let b = createLabel(2.8); //   let b: IdLabel
let c = createLabel(Math.random() ? "hello" : 42); //let c: NameLabel | IdLabel

type MessageOf1<T extends { message: unknown }> = T["message"];
interface Email {
    message: string;
}
type EmailMessageContents2 = MessageOf<Email>; //type EmailMessageContents = string


type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
    message: string;
}
interface Dog {
    bark(): void;
}
type EmailMessageContents = MessageOf<Email>; // type EmailMessageContents = string
type DogMessageContents = MessageOf<Dog>; //type DogMessageContents = never


type Flatten<T> = T extends any[] ? T[number] : T;
// Extracts out the element type.
type Str = Flatten<string[]>;// type Str = string
// Leaves the type alone.
type Num = Flatten<number>;//type Num = number

type Flatten1<Type> = Type extends Array<infer Item> ? Item : Type;

