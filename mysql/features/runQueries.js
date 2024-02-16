"use strict";

const path = require("path");
const process = require("process");
const queryJob = require(path.resolve(process.cwd(), "mysql", "jobs", "query"));

module.exports = async function (connection, howMany, sqlString) {

    for (let i = 0; i < howMany; i += 1) {
        const id = i + 1;
        await queryJob(connection, sqlString, [id]);
    }

};
