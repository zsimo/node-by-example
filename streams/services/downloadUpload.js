"use strict";

const path = require("path");
const process = require("process");
const completeHttpStreamJob = require(path.resolve(process.cwd(), "streams", "jobs", "completeHttpStream.js"));
const config = require(path.resolve(process.cwd(), "config.js"));
const request = require("request");
require(path.resolve(process.cwd(), "streams", "jobs", "showMemoryUsage.js"));
//const defaultUrl = "https://www.gutenberg.org/files/2701/old/moby10b.txt";
const defaultUrl = "https://old-releases.ubuntu.com/releases/lunar/ubuntu-23.04-beta-live-server-ppc64el.iso"


// ram memory consumption remains around 100mb
module.exports = async function (url = defaultUrl, serverUrl = config.UPLOAD_URL) {

    const readableStream = await completeHttpStreamJob(url);

    return new Promise(function (resolve, reject) {
        const postRequest = request.post(serverUrl, {
            headers: {
                "Content-Length": readableStream.headers["content-length"],
                "content-disposition": "attachment; filename="+path.basename(url),
                "Content-Type": "application/octet-stream"
            }
        });

        readableStream.data.pipe(postRequest);

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

};
