"use strict";

const path = require("path");
const process = require("process");

const fibonacciSyncService = require(path.resolve(process.cwd(), "asynchronicity", "services", "fibonacciSync"));
const fibonacciAsyncService = require(path.resolve(process.cwd(), "asynchronicity", "services", "fibonacciAsync"));
const setTimeoutIsNotAccurateService = require(path.resolve(process.cwd(), "asynchronicity", "services", "setTimeoutIsNotAccurate"));


const target = 40;

async function main () {

    const start = Date.now();

    await setTimeoutIsNotAccurateService();

    // console.log(fibonacciSyncService(target));
    // console.log(fibonacciSyncService(target));

    // const fibonacciPromise01 = fibonacciAsyncService(target);
    // const fibonacciPromise02 = fibonacciAsyncService(target);
    //
    // const result01 = await fibonacciPromise01;
    // const result02 = await fibonacciPromise02;
    //
    // console.log(result01);
    // console.log(result02);

    console.log(Date.now() - start);

    process.exit(0);

}


main();



