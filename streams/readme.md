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
- create `jobs/httpStream.js`
```js
"use strict";

const path = require("path");
const httpDriver = require(path.resolve(process.cwd(), "drivers", "http.js"));

module.exports = async function (url) {
    const response = await httpDriver({
        method: 'get',
        url: url,
        responseType: 'stream'
    });
    return response.data;
};
```
- use `jobs/httpStream.js`
```js
"use strict";

const path = require("path");
const fs = require("fs");
const { pipeline } = require("stream");
const getHttpStreamJob = require(path.resolve(process.cwd(), "jobs", "getHttpStream.js"));
const writable = fs.createWriteStream('./out.txt')
const url = "https://www.gutenberg.org/files/2701/old/moby10b.txt";

async function main () {

    pipeline(
        await getHttpStreamJob(url),
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
Export a mysql table to txt file
- Create `jobs/queryStream.js` 
```js
"use strict";

const path = require("path");
const baseConnection = require(path.resolve(process.cwd(), "drivers", "mysql", "baseConnection"));
const stream = require("stream");
const util = require("util");

function StringifyStream(options) {
    if (!(this instanceof StringifyStream))
        return new StringifyStream(options);

    options = options || {};
    options.objectMode = true;
    stream.Transform.call(this,options);
}
util.inherits(StringifyStream,stream.Transform);
StringifyStream.prototype._transform = function(d,e,callback) {
    this.push(JSON.stringify(d));
    callback();
};

module.exports = function (sqlString, values) {
    const readableStream = baseConnection.connection.query(sqlString, values)
        .stream();
    // return readableStream;
    return readableStream.pipe(StringifyStream());
};
```
- Use `jobs/queryStream.js`
```js
"use strict";

const path = require("path");
const fs = require("fs");
const { pipeline } = require("stream");
const mysqlStreamJob = require(path.resolve(process.cwd(), "jobs", "queryStream.js"));
const writable = fs.createWriteStream('./out.txt')
const sqlString = "SELECT * FROM bics";

async function main () {

    pipeline(
        await mysqlStreamJob(sqlString),
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

Export a mysql table to csv file
- install `json-to-csv-stream` dependency
```sh 
npm install json-to-csv-stream
#or 
yarn add json-to-csv-stream
```
- use it
```js
"use strict";

const path = require("path");
const fs = require("fs");
const { pipeline } = require("stream");
const mysqlStreamJob = require(path.resolve(process.cwd(), "jobs", "queryStream.js"));
const writable = fs.createWriteStream('./out.csv');
const jsonToCsvStream = require("json-to-csv-stream");
const sqlString = "SELECT * FROM my_table;";

async function main () {

    pipeline(
        await mysqlStreamJob(sqlString),
        jsonToCsvStream(),
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
Export a mysql table to zip file
```js
"use strict";

const path = require("path");
const fs = require("fs");
const { pipeline } = require("stream");
const { createGzip } = require("zlib");
const mysqlStreamJob = require(path.resolve(process.cwd(), "jobs", "getMysqlQueryStream.js"));
const writable = fs.createWriteStream('./out.txt.gz');
const jsonToCsvStream = require("json-to-csv-stream");
const sqlString = "SELECT * FROM bics;";

async function main () {

    pipeline(
        await mysqlStreamJob(sqlString),
        jsonToCsvStream(),
        createGzip(),
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
Export a mysql table to encrypted zip file
- create `jobs/encryptStream.js`
```js
"use strict";

const { Transform } = require("stream");
const { scrypt } = require("crypto");

module.exports = function () {
    return new Transform({
        decodeStrings: false,
        encoding: 'hex',
        transform (chunk, enc, next) {
            scrypt(chunk, 'a-salt', 32, (err, key) => {
                if (err) {
                    next(err)
                    return
                }
                next(null, key)
            })
        },
        final (cb) {
            // this.push('\n]\n')
            cb();
        }
    })
};
```
- use it
```js
"use strict";

const { Transform } = require("stream");
const { scrypt } = require("crypto");

module.exports = function () {
    return new Transform({
        decodeStrings: false,
        encoding: 'hex',
        transform (chunk, enc, next) {
            scrypt(chunk, 'a-salt', 32, (err, key) => {
                if (err) {
                    next(err)
                    return
                }
                next(null, key)
            })
        },
        final (cb) {
            // this.push('\n]\n')
            cb();
        }
    })
};
```
