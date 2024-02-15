"use strict";

const path = require("path");
const process = require("process");
const queryJob = require(path.resolve(process.cwd(), "mysql", "jobs", "query"));
// const logJob = require(path.resolve(process.cwd(), "mysql", "jobs", "log"));

module.exports = async function (connection, howMany, sqlString, values) {

    const promises = [];
    for (let i = 0; i < howMany; i += 1) {
        const id = (((values[0]) * howMany) + i) + 1;
        promises.push(queryJob(connection, sqlString, [id]));
    }
    return Promise.all(promises);

}
