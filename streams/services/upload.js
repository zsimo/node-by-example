"use strict";

const path = require("path");
const process = require("process");
const fs = require("fs");
const fsPromise = require("fs/promises");
const config = require(path.resolve(process.cwd(), "config.js"));
const httpDriver = require(path.resolve(process.cwd(), "drivers", "http.js"));
require(path.resolve(process.cwd(), "streams", "jobs", "showMemoryUsage.js"));

const file = path.resolve(process.cwd(), "test_upload.zip");
const readableStream = fs.createReadStream(file);

module.exports = async function (serverUrl = config.UPLOAD_URL) {

    const fileStat = await fsPromise.stat(file);

    await httpDriver.post(serverUrl, readableStream, {
        headers: {
            "Content-Length": fileStat.size,
            "content-disposition": "attachment; filename="+path.basename(file),
            "Content-Type": "application/octet-stream"
            // "Content-Type": "application/x-iso9660-image"
        }
    });

};
