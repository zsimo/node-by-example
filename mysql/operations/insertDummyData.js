"use strict";

const path = require("path");
const queryJob = require(path.resolve(process.cwd(), "mysql", "jobs", "query"));
const rows = 1000;
const sqlString = `INSERT INTO ?? (column01, column02, column03, column04) VALUES ?`;

module.exports = async function (connection, tableName) {

    const data = [];
    for (let i = 0; i < rows; i ++) {
        const row = [];
        row.push(i);
        row.push(i);
        row.push(i);
        row.push(i);
        data.push(row);

    }
    await queryJob(connection, sqlString, [tableName, data]);

};
