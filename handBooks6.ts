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


type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
    ? Return
    : never;

type Num2 = GetReturnType<() => number>; //type num2 = number
type Str2 = GetReturnType<(x: string) => string>; //type Str = string
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>; //type Bools = boolean[]

declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>; //type T1 = string | number

//Distributive Conditional Types

type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>;
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// 'ArrOfStrOrNum' is no longer a union.
type ArrOfStrOrNum = ToArrayNonDist<string | number>;


//Mapped Types
type OnlyBoolsAndHorses = {
    [key: string]: boolean | number;
};

const conforms: OnlyBoolsAndHorses = {
    del: true,
    rodney: false,
};

type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
};

type Features = {
    darkMode: () => void;
    newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<Features>; //darkMode: boolean , newUserProfile: boolean

//Mapping Modifiers
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
    readonly id: string;
    readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
};

type User = Concrete<MaybeUser>;


//Key Remapping via as
type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as KeyType]: Type[Properties]
}

// Remove the 'kind' property
type RemoveKindField<Type> = { //You can filter out keys by producing never via a conditional type:
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};
interface Circle {
    kind: "circle";
    radius: number;
}
type KindlessCircle = RemoveKindField<Circle>;


//you can map over arbitrary unions of any type
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
type Config = EventConfig<SquareEvent | CircleEvent>


//Further Exploration
type ExtractPII<Type> = {
    [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
    id: { format: "incrementing" };
    name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>; //id false - name true   


//Template Literal Types
type World = "world";
type Greeting = `hello ${World}`;
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type lang = "fa" | "en" | "ar";
type loocalMessageID = `${EmailLocaleIDs | FooterLocaleIDs}`;


//String Unions Types
const passedObject = {
    firstName: "ala",
    lastName: "Soltanzade",
    age: 21,
};

// "on" listens the event - our naive specification could be made robust if we were to ensure 


type PropEventSource<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({
    firstName: "ala",
    lastName: "solanzade",
    age: 21
});

person.on("firstNameChanged", newName => { //(parameter) newName: string
    console.log(`new name is ${newName.toUpperCase()}`);
});

person.on("ageChanged", newAge => { //(parameter) newAge: number
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
})


//Intrinsic String Manipulation Types
type Greeting2 = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting> //type ShoutyGreeting = "HELLO, WORLD"
type QuietGreeting = Lowercase<Greeting> //type QuietGreeting = "hello, world"
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app"> //type MainID = "ID-MY_APP"


