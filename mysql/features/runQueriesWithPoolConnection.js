"use strict";

const path = require("path");
const process = require("process");
const runQueriesOperation = require(path.resolve(process.cwd(), "mysql", "operations", "runQueries"));
const poolConnection = require(path.resolve(process.cwd(), "drivers", "mysql", "poolConnection"));
const connectionLimit = 10;

module.exports = async function (howMany, sqlString) {

    for (let i = 0; i < howMany / connectionLimit; i += 1) {
        await runQueriesOperation(poolConnection, connectionLimit, sqlString, [i]);
    }

};
