

`setTimeout` function is part of the `Web APIs` in the browser or `Libuv` in node.js, is not defined in the ECMAScript specification.
```js
setTimeout(function timeout() {
    console.log("second");
}, 5000);

console.log("first");
```
