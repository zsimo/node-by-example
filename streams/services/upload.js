"use strict";

const path = require("path");
const process = require("process");
const fs = require("fs");
const fsPromise = require("fs/promises");
const config = require(path.resolve(process.cwd(), "config.js"));
const request = require("request");
require(path.resolve(process.cwd(), "streams", "jobs", "showMemoryUsage.js"));

const file = path.resolve(process.cwd(), "ubuntu-23.04-beta-live-server-ppc64el.iso");

module.exports = async function (fileToBeUploaded = file,  serverUrl = config.UPLOAD_URL) {

    const readableStream = fs.createReadStream(file);
    const fileStat = await fsPromise.stat(file);

    return new Promise(function (resolve, reject) {
        const postRequest = request.post(serverUrl, {
            headers: {
                "Content-Length": fileStat.size,
                "content-disposition": "attachment; filename="+path.basename(file),
                "Content-Type": "application/octet-stream"
            }
        });

        readableStream.pipe(postRequest);

        //var upload_progress = 0;
        // postRequest.on("data", function (chunk) {
        //     upload_progress += chunk.length
        //     console.log(new Date(), upload_progress);
        // })

        postRequest.on("error", function (error) {
            reject();
        });
        postRequest.on("end", function (res) {
            resolve(res);
        });
    });





    // await httpDriver.post(serverUrl, readableStream, {
    //     headers: {
    //         "Content-Length": fileStat.size,
    //         "content-disposition": "attachment; filename="+path.basename(file),
    //         "Content-Type": "application/octet-stream"
    //         // "Content-Type": "application/x-iso9660-image"
    //     }
    // });

}

