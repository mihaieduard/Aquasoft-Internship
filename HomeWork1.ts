// 1.1 
const person = {
    name: "Alice",
    greet() {
      console.log(`Hello, my name is ${this.name}!`);
    }
  };
  person.greet(); // Output: Hello, my name is Alice!

// 1.2
var x = 10;
let y = 20;
const z = 30;

// Reatribuirile
x = 15; // OK
y = 25; // OK
// z = 35; // Error: Assignment to constant variable

// Redeclarări
var x = 50; // OK
// let y = 40; // Error: Identifier 'y' has already been declared
  

// 1.3
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// 1.4
const obj: { [key: string]: number } = { a: 1, b: 2 };

// Iterare
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(`${key}: ${obj[key]}`);
  }
}

// Copiere
const shallowCopy = { ...obj }; // Shallow copy
function deepCopy(o: any) {
  return JSON.parse(JSON.stringify(o)); // Deep copy
}


// 1.5
const numbers = [1, 2, 3, 4, 5];

// Accessor
const sliced = numbers.slice(1, 3); // [2, 3]

// Iterare
numbers.forEach(num => console.log(num)); // Logs each number
const doubled = numbers.map(num => num * 2); // [2, 4, 6, 8, 10]

// Mutator
numbers.push(6); // [1, 2, 3, 4, 5, 6]
numbers.splice(2, 1); // [1, 2, 4, 5, 6]
numbers.splice(2, 2); // [1, 2, 5, 6]
// numbers.forEach(num => console.log(num)); // Logs each number

// 1.6
// Callback
function fetchData(callback: (data: string) => void) {
  setTimeout(() => callback("Data fetched!"), 1000);
}
fetchData(data => console.log(data));

// Promise
const fetchPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => resolve("Promise resolved!"), 1000);
});
fetchPromise.then(data => console.log(data));


// 1.7
async function fetchDataAsync() {
  const data = await new Promise(resolve => setTimeout(() => resolve("Async data!"), 1000));
  console.log(data);
}
fetchDataAsync();

// 1.8
function counter():() => number {
  console.log("Script running...");
  let count = 0;
  return () => ++count;
}

const myCounter = counter();
console.log(myCounter()); // 1
console.log(myCounter()); // 2

// 1.9
