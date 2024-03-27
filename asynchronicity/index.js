"use strict";

const path = require("path");
const process = require("process");

const fibonacciJob = require(path.resolve(process.cwd(), "asynchronicity", "jobs", "fibonacci"));


// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
async function main () {

    const start = Date.now();

    console.log(fibonacciJob(144));

    console.log(Date.now() - start);

    process.exit(0);

}


main();



