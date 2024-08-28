//Modules
export default function helloWorld() {
    console.log("Hello world");
}

// import helloWorld from "./handBooks6";
helloWorld();

// @filename: maths.ts
export var pi = 3.14;
export let squareTwo1 = 1.41;
export const phi = 1.61;

export class RandomNumberGenerator { }

export function absolute(num: number) {
    if (num < 0) return num * -1;
    return num;
}

// import { pi, phi, absolute } from "./maths.js";
console.log(pi);
const absPhi = absolute(phi);

//Additional Import Syntax
import { pi as π } from "./maths.js";
console.log(π);

//@filename: app.ts
import * as math from "./maths.js";

console.log(math.pi);
const positivePhi = math.absolute(math.phi); //const positivePhi: number
console.log("3.14");


// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };

export interface Dog {
    breeds: string[];
    yearOfBirth: number;
}

import { createCatName, type Cat, type Dog } from "./animal.js";
export type Animals = Cat | Dog;
const name = createCatName();

import fs = require("fs");
const code = fs.readFileSync("hello.ts", "utf8");

function absolute1(num: number) {
    if (num < 0) return num * -1;
    return num;
}

module.exports = {
    pi: 3.14,
    squareTwo: 1.41,
    phi: 1.61,
    absolute1,
};

const maths = require("./maths");
maths.pi;

const { squareTwo } = require("./maths");
squareTwo; //const squareTwo: any

//TypeScript’s Module Output Options
import { valueOfPi } from "./constants.js";
export const twoPi = valueOfPi * 2;

Object.defineProperty(exports, "__esModule", { value: true });
exports.twoPi = void 0;
const constants_js_1 = require("./constants.js");
exports.twoPi = constants_js_1.valueOfPi * 2;

//UMD
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./constants.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.twoPi = void 0;
    const constants_js_1 = require("./constants.js");
    exports.twoPi = constants_js_1.valueOfPi * 2;
});