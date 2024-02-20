"use strict";

const path = require("path");
const fs = require("fs");
const httpDrivers = require(path.resolve(process.cwd(), "drivers", "http.js"));




async function main () {
    httpDrivers({
        method: 'get',
        url: 'https://archive.org/stream/mobydick00melv_1/mobydick00melv_1_djvu.txt',
        responseType: 'stream'
    })
        .then(function (response) {
            // response.data.pipe(process.stdout);
            response.data.pipe(fs.createWriteStream('moby.txt'));
        });
}

main();