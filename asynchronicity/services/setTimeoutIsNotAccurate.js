"use strict";

const path = require("path");
const process = require("process");

const fibonacciJob = require(path.resolve(process.cwd(), "asynchronicity", "jobs", "fibonacci"));

module.exports = function (n) {

    return new Promise(function (resolve, reject) {

        setTimeout(function () {
            resolve();
        }, 1000);
        //
        // fibonacciJob(40);
        // fibonacciJob(40);
    });

};
