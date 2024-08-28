//Utility Types

//Awaited<Type>
//This type is meant to model operations like await in async functions, or the .then() method on Promises - specifically, the way that they recursively unwrap Promises.

type A = Awaited<Promise<string>>;  //A : string
type B = Awaited<Promise<number>>;  //B : number
type C = Awaited<boolean | Promise<number>>; //C : number , boolean



//Partial<Type>      properties come to optional
interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate?: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
    title: "violin",
    description: "play the hardest sdjhgs",
};




//Required<Type>      Opposite Partial
interface Props {
    a?: number;
    b?: string;
}
const obj: Props = { a: 5 };
const obj2: Required<Props> = { a: 5, b: "hi" };



//Readonly<Type>
interface Todo {
    title: string;
}

const todo: Readonly<Todo> = {
    title: "lana",
    description: "say yes to heaven",
};

// todo.title = "Hello";  //Cannot assign to 'title' because it is a read-only property.

//Object.freeze
// function freeze<Type>(obj: Type): Readonly<Type>;

//Record<Keys, Type> like map - first type is key , second type is type of value of that key

type CatName = "miffy" | "boris" | "mordred";

interface CatInfo {
    age: number;
    breed: string;
}

const cats: Record<CatName, CatInfo> = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
};

cats.boris;


//Pick<Type, Keys>  انتخاب میکنه دقیقا کدوم ها رو میخوایم
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const pickA: TodoPreview = {
    title: "Clean room",
    completed: false,
};

//Omit<Type, Keys>      Opposite pick
interface Todo {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
}

type TodoPreviewa = Omit<Todo, "description">;

const omitA: TodoPreviewa = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
};


//Exclude<UnionType, ExcludedMembers>
type T0 = Exclude<"a" | "b" | "c", "a">;   //شامل نباشد     type T0 = "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; //type T1 = "c"
type T2 = Exclude<string | number | (() => void), Function>;

type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; x: number }
    | { kind: "triangle"; x: number; y: number };

type T3 = Exclude<Shape, { kind: "circle" }>



//Extract<Type, Union>مشترک ها رو درمیاره
type A0 = Extract<"a" | "b" | "c", "a" | "f">;   //type A0 = "a"
type A1 = Extract<string | number | (() => void), Function>;   //type A1 = () => void    arrow func type of func
type ShapeExtract =
    | { kind: "circle"; radius: number }
    | { kind: "square"; x: number }
    | { kind: "triangle"; x: number; y: number };

type A2 = Extract<ShapeExtract, { kind: "circle" }>



//NonNullable<Type>
type B0 = NonNullable<string | number | undefined>;  //type B0 = string | number
type B1 = NonNullable<string[] | null | undefined>;  //type B1 = string[]

//Parameters<Type>
declare function f1(arg: { a: number; b: string }): void;
 
type C0 = Parameters<() => string>;  // type C0 = []
type C1 = Parameters<(s: string) => void>;  //type C1 = [s: string]
type C2 = Parameters<<T>(arg: C) => C>;  //type C2 = [arg: unknown]
type C3 = Parameters<typeof f1>;
type C4 = Parameters<any>; //unknown[]


//ConstructorParameters<Type>??
type D0 = ConstructorParameters<ErrorConstructor>; //type D0 = [message?: string]
type D1 = ConstructorParameters<FunctionConstructor>;

class CD {
    constructor(a: number, b: string) {}
}
  type D3 = ConstructorParameters<typeof CD>;


//ReturnType<Type>      return type of the last signature
declare function f1(): { a: number; b: string };
type E0 = ReturnType<() => string>;// type E0 = string
type E1 = ReturnType<(s: string) => void>;// type E1 = void
type E2 = ReturnType<<T>() => T>;// type E2 = unknown
type E3 = ReturnType<<T extends U, U extends number[]>() => T>;// type E3 = number[]
type E4 = ReturnType<typeof f1>;// type E4 = {    a: number;    b: string;}
type E5 = ReturnType<any>;// type E5 = any
type E6 = ReturnType<never>;// type E6 = never

//InstanceType<Type> make a new type
class F {
    x = 0;
    y = 0;
  }
   
type F0 = InstanceType<typeof F>; //type F0 = F
type F1 = InstanceType<any>; //type F1 = any 
type F2 = InstanceType<never>; //type F2 = never

//NoInfer<Type>
function createStreetLight<C extends string>(
    colors: C[],
    defaultColor?: NoInfer<C>,
  ) {
    // ...
  }
  createStreetLight(["red", "yellow", "green"], "red");  // OK
//   createStreetLight(["red", "yellow", "green"], "blue");  // Error
  
//ThisParameterType<Type>
function toHex(this: Number) {
    return this.toString(16);
  }
   
  function numberToString(n: ThisParameterType<typeof toHex>) {
    return toHex.apply(n);
  }

//OmitThisParameter<Type>
function toHex1(this: Number) {
    return this.toString(16);
  }
   
  const fiveToHex: OmitThisParameter<typeof toHex1> = toHex1.bind(5);
   
  console.log(fiveToHex());

//ThisType<Type>
type ObjectDescriptor<D, M> = {
    data?: D;
    methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
  };
   
  function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
    let data: object = desc.data || {};
    let methods: object = desc.methods || {};
    return { ...data, ...methods } as D & M;
  }
   
  let obj3 = makeObject({
    data: { x: 0, y: 0 },
    methods: {
      moveBy(dx: number, dy: number) {
        this.x += dx; // Strongly typed this
        this.y += dy; // Strongly typed this
      },
    },
  });
   
  obj3.x = 10;
  obj3.y = 20;
  obj3.moveBy(5, 5);
  

//Intrinsic String Manipulation Types
// Uppercase<StringType>
// Lowercase<StringType>
// Capitalize<StringType>
// Uncapitalize<StringType>