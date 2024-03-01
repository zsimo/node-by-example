"use strict";

const path = require("path");
const process = require("process");
const fs = require("fs");
const readline = require("readline");

const defaultInputFile = path.resolve(process.cwd(), "cabglosett.txt");

module.exports = async function (inputFile = defaultInputFile, target = './out.txt') {

    const readableStream = fs.createReadStream(inputFile, {
        encoding: "utf-8"
    });

    const writableStream = fs.createWriteStream(target);

    const rl = readline.createInterface({
        input: readableStream,
        output: writableStream
    });

    function transform(line) {
        // console.log(line)
        this.output.write(line);
    }

    return new Promise(function (resolve, reject) {
        rl.on("line", transform)
            .on("close", function() {
                resolve();
            })
            .on("error", function (e) {
                reject(e);
            })
        ;
    });



};
