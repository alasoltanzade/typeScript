//Iterators and Generators
//Iterable is a type we can use if we want to take in types listed above which are iterable.
//it can be used with a for...of loop, which is available

// class Test<T> implements Iterable<T>{
//     constructor(private values: T[]){}
//     [Symbol.Iterators](): TestIterable<T>{
//         return new TestIterable(this.values);
//     }
// }


let numbers = [1, 2, 3, 4];
let iterator = numbers[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

for (let num of numbers) {
    console.log(num);
}
