//Object Types
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
    shape: Shape;
    xPos?: number;
    yPos?: number;
  }
   
  function paintShape1(opts: PaintOptions) {
    // ...
  }
   
  const shape = getShape();
  paintShape({ shape });
  paintShape({ shape, xPos: 100 });
  paintShape({ shape, yPos: 100 });
  paintShape({ shape, xPos: 100, yPos: 100 });

  
  
  function paintShape3(opts: PaintOptions) {
    let xPos = opts.xPos;
                     
  //(property) PaintOptions.xPos?: number | undefined
    let yPos = opts.yPos;
                     
  //(property) PaintOptions.yPos?: number | undefined
  }

  
  //if the property has never been set, we can still access it - it’s just going to give us the value undefined. We can just handle undefined specially by checking for it.
  
  function paintShape4(opts: PaintOptions) {
    let xPos = opts.xPos === undefined ? 0 : opts.xPos;
         
  let xPos: number
    let yPos = opts.yPos === undefined ? 0 : opts.yPos;
         
  let yPos: number
    // ...
  }

  
  //unspecified values is so common that JavaScript has syntax to support it.
  
  function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    console.log("x coordinate at", xPos);
                                    
  //(parameter) xPos: number
    console.log("y coordinate at", yPos);
                                    
  //(parameter) yPos: number
  }



  // there is currently no way to place type annotations within destructuring patterns. This is because the following syntax already means something different in JavaScript.
  
  function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
    render(shape);
 // Cannot find name 'shape'. Did you mean 'Shape'?
    render(xPos);
  //Cannot find name 'xPos'.
  }

  
 
  //Properties can also be marked as readonly for TypeScript. While it won’t change any behavior at runtime, a property marked as readonly can’t be written to during type-checking.
  
  interface SomeType {
    readonly prop: string;
  }
   
  function doSomething(obj: SomeType) {
    // We can read from 'obj.prop'.
    console.log(`prop has the value '${obj.prop}'.`);
   
    // But we can't re-assign it.
    obj.prop = "hello";
  // Cannot assign to 'prop' because it is a read-only property.
  }

  
  interface Home {
    readonly resident: { name: string; age: number };
  }
   
  function visitForBirthday(home: Home) {
    // We can read and update properties from 'home.resident'.
    console.log(`Happy birthday ${home.resident.name}!`);
    home.resident.age++;
  }
   

  function evict(home: Home) {
    // But we can't write to the 'resident' property itself on a 'Home'.
    home.resident = {
  // Cannot assign to 'resident' because it is a read-only property.
      name: "Victor the Evictor",
      age: 42,
    };
  }


  // It’s important to manage expectations of what readonly implies.
  
  interface Person {
    name: string;
    age: number;
  }
   
  interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
  }
   
  let writablePerson: Person = {
    name: "Person McPersonface",
    age: 42,
  };
   

  // works
  let readonlyPerson: ReadonlyPerson = writablePerson;
   
  console.log(readonlyPerson.age); // prints '42'
  writablePerson.age++;
  console.log(readonlyPerson.age); // prints '43'
  
  // Using mapping modifiers, you can remove readonly attributes.
  
  // Sometimes you don’t know all the names of a type’s properties ahead of time, but you do know the shape of the values.
  
  // In those cases you can use an index signature to describe the types of possible values, for example:
  
  interface StringArray {
    [index: number]: string;
  }
   
  const myArray: StringArray = getStringArray();
  const secondItem = myArray[1];
            
  const secondItem: string
  
  
  // Above, we have a StringArray interface which has an index signature. This index signature states that when a StringArray is indexed with a number, it will return a string.
    
  
  interface NumberDictionary {
    [index: string]: number;
   
    length: number; // ok
    name: string;
  // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
  }


  // if the index signature is a union of the property types:
  
  interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number; // ok, length is a number
    name: string; // ok, name is a string
  }
  
  
  // you can make index signatures readonly in order to prevent assignment to their indices:
  
  interface ReadonlyStringArray {
    readonly [index: number]: string;
  }
   
  let myArray: ReadonlyStringArray = getReadOnlyStringArray();
  myArray[2] = "Mallory";
  // Index signature in type 'ReadonlyStringArray' only permits reading.
  
  // You can’t set myArray[2] because the index signature is readonly.
  
  
  interface SquareConfig {
    color?: string;
    width?: number;
  }
   
  function createSquare(config: SquareConfig): { color: string; area: number } {
    return {
      color: config.color || "red",
      area: config.width ? config.width * config.width : 20,
    };
  }
   
  let mySquare = createSquare({ colour: "red", width: 100 });
  // Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
  
  
  
  let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
  
  
  interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
  }
  
  
  let squareOptions = { colour: "red", width: 100 };
  let mySquare = createSquare(squareOptions);
 
  
  let squareOptions = { colour: "red" };
  let mySquare = createSquare(squareOptions);
  // Type '{ colour: string; }' has no properties in common with type 'SquareConfig'.
  
  

  interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
  }
  
  
  interface AddressWithUnit {
    name?: string;
    unit: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
  }
  
  
  interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
  }
   
  interface AddressWithUnit extends BasicAddress {
    unit: string;
  }
  
  
  interface Colorful {
    color: string;
  }
   
  interface Circle {
    radius: number;
  }
   
  interface ColorfulCircle extends Colorful, Circle {}
   
  const cc: ColorfulCircle = {
    color: "red",
    radius: 42,
  };
  
  
  interface Colorful {
    color: string;
  }
  interface Circle {
    radius: number;
  }
   
  type ColorfulCircle = Colorful & Circle;
  

  function draw(circle: Colorful & Circle) {
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`);
  }
   
  // okay
  draw({ color: "blue", radius: 42 });
   
  // oops
  draw({ color: "red", raidus: 42 });
  // Object literal may only specify known properties, but 'raidus' does not exist in type 'Colorful & Circle'. Did you mean to write 'radius'?
 
  
  interface Person {
    name: string;
  }
  interface Person {
    name: number;
  }
  // In contrast, the following code will compile, but it results in a never type:
  
  interface Person1 {
    name: string;
  }
   
  interface Person2 {
    name: number;
  }
   
  type Staff = Person1 & Person2
   
  declare const staffer: Staff;
  staffer.name;
           
  // (property) name: never
  // In this case, Staff would require the name property to be both a string and a number, which results in property being of type never.
  
  // Generic Object Types  
  interface Box {
    contents: any;
  }
  
  interface Box {
    contents: unknown;
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

  // One type safe approach would be to instead scaffold out different Box types for every type of contents.
  
  interface NumberBox {
    contents: number;
  }
   
  interface StringBox {
    contents: string;
  }
   
  interface BooleanBox {
    contents: boolean;
  }
  
  
  function setContents(box: StringBox, newContents: string): void;
  function setContents(box: NumberBox, newContents: number): void;
  function setContents(box: BooleanBox, newContents: boolean): void;
  function setContents(box: { contents: any }, newContents: any) {
    box.contents = newContents;
  }
  
  
  interface Box<Type> {
    contents: Type;
  }
  
  
  let box: Box<string>;
  
  
  interface Box<Type> {
    contents: Type;
  }
  interface StringBox {
    contents: string;
  }
   
  let boxA: Box<string> = { contents: "hello" };
  boxA.contents;
          
  // (property) Box<string>.contents: string
   
  let boxB: StringBox = { contents: "world" };
  boxB.contents;
          
  
 
  
   
  interface Apple {
    // ....
  }
   
  // Same as '{ contents: Apple }'.
  type AppleBox = Box<Apple>;
  
  