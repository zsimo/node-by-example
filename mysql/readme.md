Install mysql dependency
```sh
npm install mysql
#or
yarn add mysql
```

a new file `package.json` and folder `node_modules` have been created, add `.gitignore` file and `init` a `git` repository
```sh
#init git
git init
#see involved files
git status
#add all new files 
git add .
# create first commmit 
git commit -m"first commit"
```

Create mysql connection in `drivers/mysql.js`
```js
"use strict";

const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "user",
    password: "pwd",
    database: "db_schema"
});

connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("connected");
    }
});

```

Use mysql connection in `index.js`
```js
"use strict";

const path = require("path");
require(path.resolve(process.cwd(), "drivers", "mysql.js"));
```

See the new connection
```sql
show processlist;
```

Add new dependency to manage db credentials
```sh
npm install env-to-config
#or
yarn add env-to-config
```

Create `.env` and `.env.example` files
```dotenv
DB_HOST=127.0.0.1
DB_DATABASE=db_schema
DB_USERNAME=user
DB_PASSWORD=pwd
```
Create `config.js` file
```js
module.exports = require("env-to-config")();
```
Update d`rivers/mysql.js` file using `.env` credentials
```js
"use strict";

const mysql = require("mysql")
const path = require("path");
const config = require(path.resolve(process.cwd(), "config"));

const connection = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE
});

connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("connected");
    }
});
```

Use mysql connection to make a query:
1. export query function in `drivers/mysql.js`
```js
"use strict";

const mysql = require("mysql")
const path = require("path");
const config = require(path.resolve(process.cwd(), "config"));

const connection = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE
});

connection.connect(function (err) {
    if (err) {
        throw err;
    }
});

module.exports = {
    query: function (sqlString, payload) {
        return new Promise(function (resolve, reject) {
            connection.query(sqlString, payload,
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }
};
```
2. use query function in `index.js`
```js
"use strict";

const path = require("path");
const mysqlDriver = require(path.resolve(process.cwd(), "drivers", "mysql.js"));


async function main () {

    const sqlString = "SELECT * FROM my_table WHERE id=?;";
    const payload = [10];
    const result = await mysqlDriver.query(sqlString, payload);
    console.log(result);

}

main();
```
#### Exiting:
When a process has nothing left to do, it exits by itself. Some API's (e.g.: mysql connection) have active handles. An active handle is a reference that keeps the process open.
To quit a process:
- quit active handles (`connection.end()`)
- close the node process (`process.exit(0)`)

Let's do more than one query:
- create a job that make a single query `jobs/query.js`:
```js
"use strict";

const path = require("path");
const mysqlDriver = require(path.resolve(process.cwd(), "drivers", "mysql.js"));

module.exports = async function (sqlString, payload) {

    console.log("__________________________________");
    console.log(sqlString, JSON.stringify(payload));
    let response;
    try {
        response = await mysqlDriver.query(sqlString, payload);
    } catch (e) {
        response = e.response;
    }
    console.log(response.length ? "Found" : "NotFound", " #id" + payload[0]);

    return response;

};
```
- use the query job in `index.js`
```js
"use strict";

const path = require("path");
const queryJob = require(path.resolve(process.cwd(), "jobs", "query.js"));

const sqlString = "SELECT * FROM my_table WHERE id=?;";
const numberOfQueries = 100;

async function main () {

    const start = Date.now();

    for (let i = 1; i <= numberOfQueries; i += 1) {
        const payload = [i];
        const result = await queryJob(sqlString, payload);
        console.log(result);
    }

    console.log("time", Date.now() - start + "ms");

}

main();
```

Let's do more than one query `in parallel`:
- create `operations/runQuery.js` file
```js
"use strict";

const path = require("path");
const queryJob = require(path.resolve(process.cwd(), "jobs", "query"));

module.exports = async function (numberOfParallelQueries, sqlString, payload) {

    const payloadId = payload[0];
    const promises = [];
    for (let i = 1; i <= numberOfParallelQueries; i += 1) {
        const id = (payloadId * numberOfParallelQueries) + i;
        promises.push(queryJob(sqlString, [id]));
    }
    return Promise.all(promises);

};
```
- use the new runQuery operation in `index.js`
```js
"use strict";

const path = require("path");
const runQueriesOperation = require(path.resolve(process.cwd(), "operations", "runQueries.js"));

const sqlString = "SELECT * FROM my_table WHERE id=?;";
const numberOfQueries = 100;
const numberOfParallelQueries = 10;

async function main () {

    const start = Date.now();

    for (let i = 0; i < (numberOfQueries / numberOfParallelQueries); i += 1) {
        const payload = [i];
        await runQueriesOperation(numberOfParallelQueries, sqlString, payload);
    }

    console.log("time", Date.now() - start + "ms");
    process.exit(0);

}

main();

```
Let's do more queries `in parallel` with a `pool connection`:
- create a new type of connection in `drivers/mysql/poolConnection.js`
```js
"use strict";

const mysql = require("mysql")
const path = require("path");
const config = require(path.resolve(process.cwd(), "config"));

const connection = mysql.createPool({
    connectionLimit : 10, // 10 is the default
    host: config.DB_HOST,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE
});

connection.getConnection(function (err) {
    if (err) {
        throw err;
    }
});

module.exports = {
    query: function (query, payload) {
        return new Promise(function (resolve, reject) {
            connection.query(query, payload,
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }

                }
            );
        });
    }
};


```
