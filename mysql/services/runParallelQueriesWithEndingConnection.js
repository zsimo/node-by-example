"use strict";

const path = require("path");
const process = require("process");
const constants = require(path.resolve(process.cwd(), "mysql", "constants"));
const runParallelQueries = require(path.resolve(process.cwd(), "mysql", "features", "runParallelQueries"));
const connection = require(path.resolve(process.cwd(), "mysql", "connections", "endingConnection"));

module.exports = async function (numberOfQueries = constants.NUMBER_OF_QUERIES) {

    await runParallelQueries(connection, numberOfQueries, constants.SQL_STRING);

};
