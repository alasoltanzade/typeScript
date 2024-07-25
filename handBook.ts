// on 'message' and then calling it
//message.toLowerCase();
// Calling 'message'
//message();
const message = 'Hello world';

message 
//For some values, such as the primitives string and number, we can identify their type at runtime using the typeof operator. But for other things like functions, there’s no corresponding runtime mechanism to identify their types. 
function fn(x){
    return x.flip();
}
//only work if given an object with a callable flip property

const user = {
    name: "Ala",
    age: 21,
  };
user.name;

const announcement = "Hello World!";

// We probably meant to write this...
announcement.toLocaleLowerCase();
announcement.toLocaleUpperCase();

function flipCoin() {
    // Meant to be Math.random()
    return Math.random();
//Operator '<' cannot be applied to types '() => number' and 'number'.
  }

const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
console.log(11)
} else if (value === "a") {  //value ==='b' is wrong
//This comparison appears to be unintentional because the types '"a"' and '"b"' have no overlap.

}

import express from "express";
const app = express();
 
app.get("/", function (req, res) {
  res.sendfile()
}
