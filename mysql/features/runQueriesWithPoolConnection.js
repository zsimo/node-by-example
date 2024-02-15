"use strict";

"use strict";

const path = require("path");
const process = require("process");
const poolQueriesOperation = require(path.resolve(process.cwd(), "mysql", "operations", "poolQueries"));
const connection = require(path.resolve(process.cwd(), "mysql", "connections", "poolConnection"));
const logJob = require(path.resolve(process.cwd(), "mysql", "jobs", "log"));
const connectionLimit = 10;

module.exports = async function (howMany, sqlString) {

    for (let i = 0; i < howMany / 10; i += 1) {
        logJob(i + 1);
        await poolQueriesOperation(connection, connectionLimit, sqlString, [i]);
    }

}
