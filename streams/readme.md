`Streams` are a way to handle reading/writing files, network communications, or any kind of end-to-end information exchange in an efficient way: streams read `chunks` of data piece by piece, processing its content without keeping it all in memory.

Streams can be `readable`, `writable`, or both.


Let's start with a readable stream:
```js
"use strict";
process.stdin.on('data', (chunk) => {
    console.log("data", chunk);
});
```
Create readable stream from data
```js
"use strict";
const { Readable } = require('stream')
const readable = Readable.from(['some', 'data', 'to', 'read'])
readable.on('data', (chunk) => {
    console.log("data", chunk);
});
```
Create readable stream from file
```js
"use strict";
const fs = require('fs');
const readable = fs.createReadStream(__filename, {
    encoding: "utf-8"
});
readable.on('data', (chunk) => {
    console.log("data", chunk);
});
```
Create readable stream from http request
- create `jobs/getHttpStream.js`
```js
const axios = require("axios");

module.exports = async function () {
    const response = await axios({
        method: 'get',
        url: 'https://www.gutenberg.org/files/2701/old/moby10b.txt',
        responseType: 'stream'
    });
    return response.data;
};
```
- use `jobs/getHttpStream.js`
```js
"use strict";

const path = require("path");
const getHttpStreamJob = require(path.resolve(process.cwd(), "jobs", "getHttpStream.js"));

async function main () {

    const readable = await getHttpStreamJob();
    readable.on('data', (chunk) => {
        console.log("data", chunk.toString());
    });
}
main();
```
Create readable stream from mysql query
- create `jobs/getMysqlQueryStream.js`
```js
"use strict";

const path = require("path");
const mysqlDriver = require(path.resolve(process.cwd(), "drivers", "mysql", "baseConnection"));

module.exports = function (sqlString, payload) {
    return mysqlDriver.connection.query(sqlString).stream();
};

```
Use `jobs/getMysqlQueryStream.js`
```js
"use strict";

const path = require("path");
const getMysqlQueryStreamJob = require(path.resolve(process.cwd(), "jobs", "getMysqlQueryStream.js"));

async function main () {

    const sqlString = "SELECT * FROM bics";
    const readable = await getMysqlQueryStreamJob(sqlString);
    readable.on('data', (chunk) => {
        console.log("data", chunk);
    });
    readable.on('end', () => {
        process.exit(0);
    });
}
main();

```

Now combine readable streams with writable streams
```js
"use strict";
process.stdin.pipe(process.stdout);
```
Combine process.stdin with writable streams (write to file)
```js
"use strict";

const fs = require("fs");
const writable = fs.createWriteStream('./out.txt')
process.stdin.pipe(writable);
```
Write some data to file
```js
"use strict";

const fs = require("fs");
const { Readable } = require("stream");
const readable = Readable.from(['some', 'data', 'to', 'read'])
const writable = fs.createWriteStream('./out.txt')
readable.pipe(writable);
```
Copy file
```js
"use strict";

const fs = require("fs");
const readable = fs.createReadStream(__filename, {
    encoding: "utf-8"
});
const writable = fs.createWriteStream('./out.js')
readable.pipe(writable);
```
Download file
```js
"use strict";

const path = require("path");
const fs = require("fs");
const getHttpStreamJob = require(path.resolve(process.cwd(), "jobs", "getHttpStream.js"));
const writable = fs.createWriteStream('./out.txt')

async function main () {

    const readable = await getHttpStreamJob();
    readable.pipe(writable);

}
main();
```
Download file using pipeline
```js
"use strict";

const path = require("path");
const fs = require("fs");
const { pipeline } = require("stream");
const getHttpStreamJob = require(path.resolve(process.cwd(), "jobs", "getHttpStream.js"));
const writable = fs.createWriteStream('./out.txt')

async function main () {

    pipeline(
        await getHttpStreamJob(),
        writable,
        (err) => {
            if (err) {
                console.error('Pipeline failed', err);
                process.exit(1);
            } else {
                console.log(`Completed`);
                process.exit(0);
            }
        }
    )

}
main();
```
