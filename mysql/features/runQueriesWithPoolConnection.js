"use strict";

const path = require("path");
const process = require("process");
const runQueriesOperation = require(path.resolve(process.cwd(), "mysql", "operations", "runQueries"));
const poolConnection = require(path.resolve(process.cwd(), "mysql", "connections", "poolConnection"));
// const endingConnection = require(path.resolve(process.cwd(), "mysql", "connections", "endingConnection"));
// const baseConnection = require(path.resolve(process.cwd(), "mysql", "connections", "baseConnection"));
const connectionLimit = 10;

module.exports = async function (howMany, sqlString) {

    for (let i = 0; i < howMany / connectionLimit; i += 1) {
        await runQueriesOperation(poolConnection, connectionLimit, sqlString, [i]);
    }

};
