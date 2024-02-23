"use strict";

const path = require("path");
const process = require("process");
const createTableIfNotExistsOperation = require(path.resolve(process.cwd(), "mysql", "operations", "createTableIfNotExists"));
const insertDummyDataOperation = require(path.resolve(process.cwd(), "mysql", "operations", "insertDummyData"));
const connection = require(path.resolve(process.cwd(), "drivers", "mysql", "baseConnection"));

const tableName = "simone_dummy_3";

module.exports = async function () {

    await createTableIfNotExistsOperation(connection, tableName);
    const result = await insertDummyDataOperation(connection, tableName);
    console.log(result);

};
