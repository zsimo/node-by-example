

`setTimeout` function is part of the `Web APIs` in the browser or `Libuv` in node.js, is not defined in the ECMAScript specification.
```js
setTimeout(function print2timeout() {
    console.log("2");
}, 5000);

console.log("1");
```


`event loop` can't pull callbacks from queues until the `call stack is empty`
```js
function sleepSync (msec) {
    let i = 0
    const start = Date.now()
    while (Date.now() - start < msec) { i++ }
    return i
}
setTimeout(function printAfter() {
    console.log("after");
}, 0);

sleepSync(5000);
```


sleepSync
```js
function sleepSync (msec) {
    let i = 0
    const start = Date.now()
    while (Date.now() - start < msec) { i++ }
    return i
}

const http = require("http");
const server = http.createServer((req, res) => {

    console.log("--> request", req.url);

    sleepSync(10000);

    console.log("<-- response", req.url);
    res.end("ciao\r\n");

});
server.listen(8000);
```


sleepAsync with promise
```js
function sleepAsync (msec) {
    return new Promise(function executor (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, msec);
    });
}

const http = require("http");
const server = http.createServer((req, res) => {

    console.log("--> request", req.url);

    sleepAsync(10000).then(function () {
        console.log("<-- response", req.url);
        res.end("ciao\r\n");
    });

});
server.listen(8000);
```

sleepAsync with promise (async/await)
```js
function sleepAsync (msec) {
    return new Promise(function executor(resolve, reject) {
        setTimeout(function () {
            resolve();
        }, msec);
    });
}

const http = require("http");
const server = http.createServer(async (req, res) => {

    console.log("--> request", req.url);

    await sleepAsync(10000);

    console.log("<-- response", req.url);
    res.end("ciao\r\n");

});
server.listen(8000);
```



