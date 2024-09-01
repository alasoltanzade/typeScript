//Type Compatibility
interface Square1 {
    width: number;
    height: number;
}
interface Rectangle {
    width: number;
    height: number;
}

let square: Square1 = { width: 5, height: 5 };
let rectangle: Rectangle = { width: 10, height: 20 };

square = rectangle; // This is allowed because a rectangle has the same structure as a square.



interface Bird2 {
    wings: number;
}
interface Plane {
    wings: number;
}

let bird: Bird2 = { wings: 2 };
let plane: Plane = { wings: 2 };

bird = plane; // مشکلی نیست چون هر دو ساختار مشابه دارند



interface Pet {
    name: string;
}
class Dogs {
    name: string;
}
let pet: Pet;
// OK, because of structural typing
pet = new Dogs();


interface PetRabit {
    name: string;
}
let rabbit: PetRabit;
// dog's inferred type is { name: string; owner: string; }
let rabb = { name: "ali", owner: "something" };
rabbit = rabb;

let unicorn = { name: "Lassie", owner: "Rudd Weatherwax" };
function greet(pet: Pet) { }
greet(unicorn); // OK


//Comparing two functions
let x1 = (a: number) => 0;
let y1 = (b: number, s: string) => 0;
y1 = x1; // OK
// x1 = y1; // Error

let items = [1, 2, 3];
// Don't force these extra parameters
items.forEach((item, index, array) => console.log(item));
// Should be OK!
items.forEach((item) => console.log(item));




//Function Parameter Bivariance
enum EventType {
    Mouse,
    Keyboard,
}
interface Event {
    timestamp: number;
}
interface MyMouseEvent extends Event {
    x: number;
    y: number;
}
interface MyKeyEvent extends Event {
    keyCode: number;
}
function listenEvent(eventType: EventType, handler: (n: Event) => void) {
    /* ... */
}
// Unsound, but useful and common
listenEvent(EventType.Mouse, (e: MyMouseEvent) => console.log(e.x + "," + e.y));
// Undesirable alternatives in presence of soundness
listenEvent(EventType.Mouse, (e: Event) =>
    console.log((e as MyMouseEvent).x + "," + (e as MyMouseEvent).y)
);
listenEvent(EventType.Mouse, ((e: MyMouseEvent) =>
    console.log(e.x + "," + e.y)) as (e: Event) => void);
// Still disallowed (clear error). Type safety enforced for wholly incompatible types
listenEvent(EventType.Mouse, (e: number) => console.log(e));


//Optional Parameters and Rest Parameters
function invokeLater(args: any[], callback: (...args: any[]) => void) {
    /* ... Invoke callback with 'args' ... */
}
// Unsound - invokeLater "might" provide any number of arguments
invokeLater([1, 2], (x, y) => console.log(x + ", " + y));
// Confusing (x and y are actually required) and undiscoverable
invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));




//Enums
enum Status {
    Ready,
    Waiting,
}
enum Color {
    Red,
    Blue,
    Green,
}
let status = Status.Ready;
status = Color.Green; // Error


//Classes
class Animal3 {
    feet: number;
    constructor(name: string, numFeet: number) { }
}
class Size {
    feet: number;
    constructor(numFeet: number) { }
}
let a: Animal3;
let s: Size;
a = s; // OK
s = a; // OK



//Generics
interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;
x = y; // Error, because x and y are not compatible

let identity = function <T>(x: T): T {
    // ...
};
let reverse = function <U>(y: U): U {
    // ...
};
identity = reverse; // OK, because (x: any) => any matches (y: any) => any










//Type Inference
//Type inference in TypeScript is when the TypeScript compiler automatically figures out what type a variable is, without you explicitly telling it.
//It’s like TypeScript using its "best guess" based on how you define and use a variable.
let x = [0, 1, null];
let zoo = [new Rhino(), new Elephant(), new Snake()];
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];

window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button);
}
// Declares there is a global variable called 'window'
declare var window: Window & typeof globalThis;
// Which is declared as (simplified):
interface Window extends GlobalEventHandlers {
    // ...
}
// Which defines a lot of known handler events
interface GlobalEventHandlers {
    onmousedown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    // ...
}


const handler = function (uiEvent) {
    console.log(uiEvent.button); // <- OK
};
window.onscroll = function (uiEvent: any) {
    console.log(uiEvent.button); // <- Now, no error is given
};

function createZoo(): Animal[] {
    return [new Rhino(), new Elephant(), new Snake()];
}