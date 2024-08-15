//type Manipulation

//Generics
function identity(arg: number): number {
    return arg;
}
function identity1(arg: any): any {
    return arg;
}
function identity2<Type>(arg: Type): Type {
    return arg;
}
function loggingIdentity<Type>(arg: Type[]): Type[] {
    console.log(arg.length);
    return arg;
}
function loggingIdentity1<Type>(arg: Array<Type>): Array<Type> {
    console.log(arg.length); // Array has a .length, so no more error
    return arg;
}
function identity3<Type>(arg: Type): Type {
    return arg;
}
let myIdentity: <Type>(arg: Type) => Type = identity3;

function identity4<Type>(arg: Type): Type {
    return arg;
}
let myIdentity2: <Input>(arg: Input) => Input = identity4;

//to create generic interfaces
interface GenericIdentityFn {
    <Type>(arg: Type): Type;
}
function identity5<Type>(arg: Type): Type {
    return arg;
}
let myIdentity5: GenericIdentityFn = identity5;

//Generic Classes
class GenericNumber<NumType> {
    zeroValue: NumType;
    add: (x: NumType, y: NumType) => NumType;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};

let stringNumeric = new GenericNumber<string>();//use string
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
    return x + y;
};
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

//Generic Constraints
interface Lengthwise {
    length: number;
}

function loggingIdentitys<Type extends Lengthwise>(arg: Type): Type {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
}


//Using Type Parameters in Generic Constraints
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");

//Using Class Types in Generics
function create<Type>(c: { new(): Type }): Type {
    return new c();
}

//prototype property to infer and constrain relationships between the constructor function and the instance side of class types
class BeeKeeper {
    hasMask: boolean = true;
}

class ZooKeeper {
    nametag: string = "Mikle";
}

class Animal {
    numLegs: number = 4;
}

class Bee extends Animal {
    numLegs = 6;
    keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
    keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

// Generic Parameter Defaults
// declare function create1(): Container<HTMLDivElement, HTMLDivElement[]>;
// declare function create1<T extends HTMLElement>(element: T): Container<T, T[]>;
// declare function create1<T extends HTMLElement, U extends HTMLElement>(
//     element: T,
//     children: U[]
// ): Container<T, U[]>;


// declare function create2<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(
//     element?: T,
//     children?: U
// ): Container<T, U>;
// const div = create2();
// //const div: Container<HTMLDivElement, HTMLDivElement[]>
// const p = create2(new HTMLParagraphElement());