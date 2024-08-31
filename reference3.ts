//Declaration Merging

interface Test {
    height: number;
    width: number;
}
interface Test {
    scale: number;
}
let tst: Test = { height: 5, width: 6, scale: 10 };



//the same name interface should be the same type
interface Animal {
    clone(animal: Animal): Animal;
}
interface Animal {
    clone(animal: Rabit): Rabit;
}
interface Animal {
    clone(animal: Dog): Dog;
    clone(animal: Bird): Bird;
}
//The three interfaces will merge to create a single declaration as so:
interface Animal {
    clone(animal: Dog): Dog;
    clone(animal: Bird): Bird;
    clone(animal: Rabit): Rabit;
    clone(animal: Animal): Animal;
}

//more example
interface Document {
    createElement(tagName: any): Element;
}
interface Document {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
    createElement(tagName: string): HTMLElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
}
interface Document {
    createElement(tagName: "canvas"): HTMLCanvasElement;
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: string): HTMLElement;
    createElement(tagName: any): Element;
}

//Merging Namespaces
namespace Animals {
    export class Zebra { }
}
namespace Animals {
    export interface Legged {
        numberOfLegs: number;
    }
    export class Dog { }
}
namespace Animals {
    export interface Legged {
        numberOfLegs: number;
    }
    export class Cat { }
    export class Donky { }
}

namespace Animals {
    let haveMuscles = true;
    export function animalsHaveMuscles() {
        return haveMuscles;
    }
}

//Merging Namespaces with Classes
class Album {
    label: Album.AlbumLabel;
}
namespace Album {
    export class AlbumLabel { }
}

//Merging Namespaces with function
function buildLabel(name: string): string {
    return buildLabel.prefix + name + buildLabel.suffix;
}
namespace buildLabel {
    export let suffix = "";
    export let prefix = "Hello, ";
}
console.log(buildLabel("Ala"));

///Namespaces with enums
enum Color {
    red = 1,
    green = 2,
    blue = 4,
}
namespace Color {
    export function mixColor(colorName: string) {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        } else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        } else if (colorName == "magenta") {
            return Color.red + Color.blue;
        } else if (colorName == "cyan") {
            return Color.green + Color.blue;
        }
    }
}


//Disallowed Merges
//classes can not merge with other classes or with variables
//modules do not support merging
// observable.ts
export class Observable<T> {
    // ... implementation left as an exercise for the reader ...
}


//Global augmentation
export class Observable4<T> {
    // ... still no implementation ...
}
declare global {
    interface Array<T> {
        toObservable(): Observable<T>;
    }
}
// Array.prototype.toObservable = function () {
//     // ...
// };