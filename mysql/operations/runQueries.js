"use strict";

const path = require("path");
const process = require("process");
const queryJob = require(path.resolve(process.cwd(), "mysql", "jobs", "query"));

module.exports = async function (connection, howMany, sqlString, values) {

    const idValue = values[0];
    const promises = [];
    for (let i = 1; i <= howMany; i += 1) {
        const id = (idValue * howMany) + i;
        promises.push(queryJob(connection, sqlString, [id]));
    }
    return Promise.all(promises);

};
