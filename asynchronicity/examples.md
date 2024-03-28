

`setTimeout` function is part of the `Web APIs` in the browser or `Libuv` in node.js, is not defined in the ECMAScript specification.
```js
setTimeout(function timeout() {
    console.log("second");
}, 5000);

console.log("first");
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
    return new Promise(function (resolve, reject) {
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
    return new Promise(function (resolve, reject) {
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



