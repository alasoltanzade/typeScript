//Symbols
//symbol is a primitive data type, just like number and string.

//A symbol is like a label, but with a magical twist: every time you create a symbol, it's always unique, even if you give it the same description.
let symbol1 = Symbol("toy");
let symbol2 = Symbol("toy");
console.log(symbol1 === symbol2); // false

const specialProperty = Symbol("special");

const toy = {
    name: "Action Figure",
    [specialProperty]: "Limited Edition"
};

console.log(toy[specialProperty]); // "Limited Edition"
//Symbols in TypeScript are like unique name tags for identifying things. They help you avoid accidental name clashes and can be used to add special, hidden properties to objects.



let sym1 = Symbol();
let sym2 = Symbol("key"); // optional string key
let sym3 = Symbol("key");

sym2 === sym3; // false, symbols are unique

let objsymol = {
    [sym1]: "value",
};
console.log(objsymol[sym1]); // "value"

const getClassNameSymbol = Symbol();
class sym4 {
    [getClassNameSymbol]() {
        return "sym4";
    }
}
let sym5 = new sym4();
let className = sym5[getClassNameSymbol](); // "sym4"


//unique symbol
declare const sym6: unique symbol;

// sym7 can only be a constant reference.
const sym7: unique symbol = Symbol();

// Works - refers to a unique symbol, but its identity is tied to 'sym1'.
let sym8: typeof sym1 = sym1;

// Also works.
class SymbolUniq {
    static readonly StaticSymbol: unique symbol = Symbol();
}

if (sym1 === sym2) {
    //This comparison appears to be unintentional because the types 'typeof sym2' and 'typeof sym3' have no overlap.}
}



/*Well-known Symbols______________

Symbol.asyncIterator
A method that returns async iterator for an object, compatible to be used with for await..of loop.

Symbol.hasInstance
A method that determines if a constructor object recognizes an object as one of the constructor’s instances. Called by the semantics of the instanceof operator.

Symbol.isConcatSpreadable
A Boolean value indicating that an object should be flattened to its array elements by Array.prototype.concat.

Symbol.iterator
A method that returns the default iterator for an object. Called by the semantics of the for-of statement.

Symbol.match
A regular expression method that matches the regular expression against a string. Called by the String.prototype.match method.

Symbol.replace
A regular expression method that replaces matched substrings of a string. Called by the String.prototype.replace method.

Symbol.search
A regular expression method that returns the index within a string that matches the regular expression. Called by the String.prototype.search method.

Symbol.species
A function valued property that is the constructor function that is used to create derived objects.

Symbol.split
A regular expression method that splits a string at the indices that match the regular expression. Called by the String.prototype.split method.

Symbol.toPrimitive
A method that converts an object to a corresponding primitive value. Called by the ToPrimitive abstract operation.

Symbol.toStringTag
A String value that is used in the creation of the default string description of an object. Called by the built-in method Object.prototype.toString.

Symbol.unscopables
An Object whose own property names are property names that are excluded from the ‘with’ environment bindings of the associated objects.


*/