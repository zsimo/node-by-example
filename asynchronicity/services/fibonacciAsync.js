"use strict";

const path = require("path");
const process = require("process");
const { fork } = require('child_process');


module.exports = function (n) {

    const fibonacciProcess = fork(path.resolve(process.cwd(), "asynchronicity", "operations", "fibonacci.js"));
    fibonacciProcess.send(n);

    return new Promise(function (resolve, reject) {

        fibonacciProcess.on("message", function (result) {
            resolve(result);
        });
        fibonacciProcess.on("error", function (error) {
            reject(error);
        });

    });

};
