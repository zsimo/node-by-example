"use strict";

const path = require("path");
const process = require("process");

//const runQueriesFeature = require(path.resolve(process.cwd(), "mysql", "features", "runQueriesWithEndingConnection")); // 22969
//const runQueriesFeature = require(path.resolve(process.cwd(), "mysql", "features", "runQueriesWithBaseConnection")); // 7433
const runQueriesFeature = require(path.resolve(process.cwd(), "mysql", "features", "runQueriesWithPoolConnection")); // 3398


const numberOfQueries = 10000;
const sqlString = "SELECT * FROM broadcasts WHERE id=?;";


async function main () {


    const start = Date.now();


    await runQueriesFeature(numberOfQueries, sqlString);

    console.log(Date.now() - start);
    process.exit(0);

    // try {
    //     const result = await db(query, [3]);
    //     console.log(result)
    //     process.exit(0);
    // } catch (e) {
    //     console.log(e);
    //     // process.exit(1);
    // }
}



main();

