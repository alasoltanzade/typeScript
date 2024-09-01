//Namespaces پیدا کردن دیتا ها اسان میکنه راحت تر

//validators in a single file
interface StringValidator {
    isAcceptable(s: string): boolean;
}
let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+$/;
class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
        return lettersRegexp.test(s);
    }
}
class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
// Some samples to try
let strings = ["Hello", "98052", "101"];
// Validators to use
let validators: { [s: string]: StringValidator } = {};
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();
// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        let isMatch = validators[name].isAcceptable(s);
        console.log(`'${s}' ${isMatch ? "matches" : "does not match"} '${name}'.`);
    }
}


//Namespaced Validators
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
// Some samples to try
let stringss = ["Hello", "98052", "101"];
// Validators to use
let validatorss: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(
            `"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"
            } ${name}`
        );
    }
}


//Multi-file namespaces
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}


// <reference path="Validation.ts" />
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator1 implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}

namespace Validation {
    const numberRegexp = /^[0-9]+$/;
    export class ZipCodeValidatoqr implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
// Some samples to try
let stringsss = ["Hello", "98052", "101"];
// Validators to use
let validatorsss: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(
            `"${s}" - ${validators[name].isAcceptable(s) ? "matches" : "does not match"
            } ${name}`
        );
    }
}

//Aliases
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}
import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as 'new Shapes.Polygons.Square()'


//Ambient Namespaces
declare namespace D3 {
    export interface Selectors {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        };
    }
    export interface Event {
        x: number;
        y: number;
    }
    export interface Base extends Selectors {
        event: Event;
    }
}
declare var d3: D3.Base;





//Namespaces and Modules
// In a .d.ts file or .ts file that is not a module:
// declare module "SomeModule" {
//     export function fn(): string;
// }
//myOtherModule.ts
//<reference path="myModules.d.ts" />
//import * as m from "SomeModule";

//shapes.ts
export namespace Shapess {
    export class Triangle {
        /* ... */
    }
    export class Square {
        /* ... */
    }
}


//shapeConsumer.ts
// import * as shapes from "./shapes";
// let t = new shapes.Shapes.Triangle(); // shapes.Shapes?

