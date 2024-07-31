//More on Functions

//Function Type Expressions
function greeter(fn: (a: string) => void) {
    fn("Hello, World");
  }
//(a: string) => void means “a function with one parameter, named a, of type string, that doesn’t have a return value”
  function printToConsole(s: string) {
    console.log(s);
  }
  greeter(printToConsole);

  type GreetFunction = (a: string) => void;
  function greeter1(fn: GreetFunction){  }


//Call Signatures

type MyObject = {
    (input: string): string; // Call signature
    propertyName: string;    // Property
};
const myObject: MyObject = (input: string) => {
    return `Hello, ${input}!`;
};
myObject.propertyName = "Greeting Function";
console.log(myObject("World")); // Output: Hello, World!
console.log(myObject.propertyName); // Output: Greeting Function
//use : between the parameter list and the return type rather than =>


type DescribableFunction = {
    description: string;  // Call signature
    (someArg: number): boolean;
  };
  function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6)); }
   
  function myFunc(someArg: number) {
    return someArg > 3; }
  myFunc.description = "default description";
  doSomething(myFunc);
  

//Construct Signatures
type SomeConstructor = {
    new (s: string): Object;
  };
  function a(ctor: SomeConstructor) {
    return new ctor("hello");
  }

  interface CallOrConstruct {
    (n?: number): string;
    new (s: string): Date;
    //JavaScript’s Date object, can be called with or without new
  }



//Generic Functions
function firstElement(arr: any[]) {
    return arr[0];
  }
  
function firstElement1<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}
  

// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const b = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
  }
   
  // Parameter 'n' is of type 'string'
  // 'parsed' is of type 'number[]'
  const parsed = map(["1", "2", "3"], (n) => parseInt(n));
  

//Constraints
function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
      return a;
    } else {
      return b;
    }
  }
   
// longerArray is of type 'number[]'
  const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
  const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
  //const notOK = longest(10,10, 100);

//Specifying Type Arguments
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
  }

  
const arr = combine<string | number>([1, 2, 3], ["hello"]);


//Push Type Parameters Down
function firstElement2<Type>(arr: Type[]) {
    return arr[0];
  }
   
  function firstElement3<Type extends any[]>(arr: Type) {
    return arr[0];
  }
   
  // a: number (good)
  const aa = firstElement2([1, 2, 3]);
  // b: any (bad)
  const bb = firstElement3([1, 2, 3]);
  

//Use Fewer Type Parameters
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
    return arr.filter(func);
  }
   
  function filter2<Type, Func extends (arg: Type) => boolean>(
    arr: Type[],
    func: Func
  ): Type[] {
    return arr.filter(func);
  }

  
//Type Parameters Should Appear Twice
function greetParametr<Str extends string>(s: Str) {
    console.log("Hello, " + s);
  }
  greetParametr("world");


//Optional Parameters
function f(n: number) {
    console.log(n.toFixed()); // 0 arguments
    console.log(n.toFixed(3)); // 1 argument
  }

  function fu(x?: number) {
    // ...
  }
  fu(); // OK
  fu(10); // OK
  fu(undefined);


//Optional Parameters in Callbacks
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i], i);
    }
  }

  //optiopnal paarmeter
  myForEach([1, 2, 3], (a) => console.log(a));
  myForEach([1, 2, 3], (a, i) => console.log(a, i));
  

  function myForEachimplementation(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
      // I don't feel like providing the index today
      callback(arr[i]);
    }
  }
  
  myForEach([1, 2, 3], (a, i) => {
  //  console.log(i.toFixed());
 // 'i' is possibly 'undefined'.
  });
  
//Function Overloads
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }  //two overloads
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);


function fnc(x: string): void;
function fnc() {
  // ...
}
// Expected to be able to call with zero arguments
//fnc();    Expected 1 arguments, but got 0.


//Writing Good Overloads
function len(s:string): number;
function len(arr:any[]): number;
function len(x:any){
    return x.length;
}

len ("") //ok
len([0]); //ok
// len(Math.random() > 0.5 ? "hi" : [0]); No overload matches this call.

function lenOverloads(x: any[] | string) {
    return x.length;
  }
  
//Declaring <this> in a Function
const user1 = {
    id: 123,
    admin: false,
    becomeAdmin: function () {
      this.admin = true;
    },
  };


//   interface DB {
//     filterUsers(filter: (this: User) => boolean): User[];
//   }
   
//   const db = getDB();
//   const admins = db.filterUsers(function (this: User) {
//     return this.admin;
//   });

  

//void
function noop(){
    return;  // The inferred return type is void
}


function f1(a: any) {
    a.b(); // OK
  }
  function f2(a: unknown) {
//    a.b();
//  'a' is of type 'unknown'.
  }



  function safeParse(s: string): unknown {
    return JSON.parse(s);
  }
  // Need to be careful with 'obj'!
  const obj3 = safeParse("someRandomString");



//Some functions never return a value:
  function fail(msg: string): never {
    throw new Error(msg);
  }
  



//never also appears when TypeScript determines there’s nothing left in a union.
  function fne(x: string | number) {
    if (typeof x === "string") {
      // do something
    } else if (typeof x === "number") {
      // do something else
    } else {
      x; // has type 'never'!
    }
  }
  

//Function
function doSomething123(f: Function) {
  return f(1, 2, 3);
}


//Rest Parameters
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const ash = multiply(10, 1, 2, 3, 4);

//rest arguments
const arr3 = [1,2,3,];
const arr4 = [4,5,6];
arr3.push(...arr4);

const args = [8, 5] as const;
const angle = Math.atan2(...args);


// Inferred as 2-length tuple
const args1 = [8, 5] as const;
// OK
const angle2 = Math.atan2(...args);


//Parameter Destructuring
function sum({ a, b, c }) {
  console.log(a + b + c);
}
sum1({ a: 10, b: 3, c: 9 });
function sum1({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}

// Same as prior example
type ABC = { a: number; b: number; c: number };
function sum3({ a, b, c }: ABC) {
  console.log(a + b + c);
}

//Return type void
type voidFunc = () => void;
 
const f11: voidFunc = () => {
  return true;
};
 
const f22: voidFunc = () => true;
 
const f33: voidFunc = function () {
  return true;
};

const v1 = f11();
const v2 = f22();
const v3 = f33();


const src = [1, 2, 3];
const dst = [0];
src.forEach((el) => dst.push(el));

function f44(): void {
  // @ts-expect-error
  return true;
}
 
const f55 = function (): void {
  // @ts-expect-error
  return true;
};

console.log("9 mordad =)")
