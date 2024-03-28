The `Promise` object represents the eventual completion (or failure) of an asynchronous operation and its resulting value; it's a `placeholder` for a future value. It's a `asynchronous coding pattern`.

regular callback function returns nothing
```js
const fs = require("fs");
const result = fs.readFile(__filename, function (err, fileContent) {
    console.log(fileContent.toString())
});
console.log(result); // undefined
```

promise returns a placeholder for a future value, as a wrapper around a future value, 
```js
const fs = require("fs").promises;
const result = fs.readFile(__filename);
console.log(result); // Promise { <pending> }
```

A Promise is in one of these states:
- `pending`: initial state, neither fulfilled nor rejected
- `fulfilled`: meaning that the operation was completed successfully ()
- `rejected`: meaning that the operation failed.

A promise is said to be `settled` if it is either fulfilled or rejected, but not pending.



### async/await
Each time when an `async` function is called, it `returns a new Promise` which will be `resolved` with the value returned by the async function, or `rejected` with an exception uncaught within the async function.

`Async` functions can contain zero or more `await` expressions. Await expressions make promise-returning `functions behave as though they're synchronous` by suspending execution until the returned promise is fulfilled or rejected. The resolved value of the promise is treated as the return value of the await expression. Use of async and await enables the use of ordinary `try / catch` blocks around asynchronous code.
