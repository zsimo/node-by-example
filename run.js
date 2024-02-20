"use strict";

const path = require("path");
const process = require("process");

//const runQueriesFeature = require(path.resolve(process.cwd(), "mysql", "features", "runQueriesWithEndingConnection")); // 22969
//const runQueriesFeature = require(path.resolve(process.cwd(), "mysql", "features", "runQueriesWithBaseConnection")); // 7433
const runQueriesFeature = require(path.resolve(process.cwd(), "mysql", "features", "runQueriesWithPoolConnection")); // 3398
//const runQueriesFeature = require(path.resolve(process.cwd(), "mysql", "services", "runParallelQueriesWithBaseConnection")); // 3398
//const runQueriesFeature = require(path.resolve(process.cwd(), "mysql", "services", "runParallelQueriesWithEndingConnection")); // 3398


const numberOfQueries = 1000;
const sqlString = "SELECT * FROM bics WHERE id=?;";


async function main () {

    const start = Date.now();

    await runQueriesFeature(numberOfQueries, sqlString);

    console.log(Date.now() - start);

    process.exit(0);

}


main();



