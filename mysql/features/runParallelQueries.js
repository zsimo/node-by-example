"use strict";

const path = require("path");
const process = require("process");
const runQueriesOperation = require(path.resolve(process.cwd(), "mysql", "operations", "runQueries"));
const constants = require(path.resolve(process.cwd(), "mysql", "constants"));

module.exports = async function (connection, howMany, sqlString) {

    for (let i = 0; i < howMany / constants.NUMBER_OF_PARALLEL_RUNS; i += 1) {
        await runQueriesOperation(connection, constants.NUMBER_OF_PARALLEL_RUNS, sqlString, [i]);
    }

};

