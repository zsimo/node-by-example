"use strict";

const path = require("path");
const process = require("process");
const constants = require(path.resolve(process.cwd(), "mysql", "constants"));
const runQueriesFeature = require(path.resolve(process.cwd(), "mysql", "features", "runQueries"));
const connection = require(path.resolve(process.cwd(), "drivers", "mysql", "endingConnection"));

module.exports = async function (numberOfQueries = constants.NUMBER_OF_QUERIES) {

    await runQueriesFeature(connection, numberOfQueries, constants.SQL_STRING);

};
