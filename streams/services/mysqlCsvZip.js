"use strict";

const path = require("path");
const process = require("process");
const fs = require("fs");
const { pipeline } = require("node:stream/promises");
const jsonToCsvStream = require("json-to-csv-stream");
const { createGzip } = require("zlib");
const mysqlStreamJob = require(path.resolve(process.cwd(), "streams", "jobs", "queryStream.js"));
const formatBytesJob = require(path.resolve(process.cwd(), "streams", "jobs", "formatBytes.js"));

const defaultSqlString = "SELECT * FROM bics;";

module.exports = async function (sqlString = defaultSqlString, target = './out.zip') {

    const readableStream = await mysqlStreamJob(sqlString);
    let downloaded = 0;
    readableStream.on("data", function (chunk) {
        downloaded += chunk.length;
        console.log("receiving", formatBytesJob(downloaded));
    });
    const writableStream = fs.createWriteStream(target);

    return pipeline (
        readableStream,
        jsonToCsvStream(),
        createGzip(),
        writableStream
    );

};
