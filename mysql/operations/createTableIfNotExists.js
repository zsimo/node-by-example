"use strict";

const path = require("path");
const queryJob = require(path.resolve(process.cwd(), "mysql", "jobs", "query"));

const sqlString = `CREATE TABLE IF NOT EXISTS ??(
    id int(11) AUTO_INCREMENT,
    column01 varchar(100) NOT NULL,
    column02 varchar(100) NOT NULL,
    column03 varchar(100) NOT NULL,
    column04 varchar(100) NOT NULL,
    KEY id (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci`;

module.exports = async function (connection, tableName) {

    return queryJob(connection, sqlString, [tableName]);

};
