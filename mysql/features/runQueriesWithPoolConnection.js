"use strict";

"use strict";

const path = require("path");
const process = require("process");
const runPoolQueriesOperation = require(path.resolve(process.cwd(), "mysql", "operations", "runPoolQueries"));
const connection = require(path.resolve(process.cwd(), "mysql", "connections", "poolConnection"));
const connectionLimit = 10;

module.exports = async function (howMany, sqlString) {

    for (let i = 0; i < howMany / 10; i += 1) {
        await runPoolQueriesOperation(connection, connectionLimit, sqlString, [i]);
    }

}
