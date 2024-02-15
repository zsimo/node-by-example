"use strict";

"use strict";

const path = require("path");
const process = require("process");
const queryJob = require(path.resolve(process.cwd(), "mysql", "jobs", "query"));
const connection = require(path.resolve(process.cwd(), "mysql", "connections", "baseConnection"));
const logJob = require(path.resolve(process.cwd(), "mysql", "jobs", "log"));

module.exports = async function (howMany, sqlString) {

    for (let i = 0; i < howMany; i += 1) {
        logJob(i + 1);
        await queryJob(connection, sqlString, [i]);
    }

}
