"use strict";

const path = require("path");
const process = require("process");

const fibonacciJob = require(path.resolve(process.cwd(), "asynchronicity", "jobs", "fibonacci"));


module.exports = function (n) {
    return fibonacciJob(n);
};
