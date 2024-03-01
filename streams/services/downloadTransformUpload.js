"use strict";

const path = require("path");
const process = require("process");
const completeHttpStreamJob = require(path.resolve(process.cwd(), "streams", "jobs", "completeHttpStream.js"));
const config = require(path.resolve(process.cwd(), "config.js"));
const uppercaseStreamJob = require(path.resolve(process.cwd(), "streams", "jobs", "uppercaseStream.js"));
const httpDriver = require(path.resolve(process.cwd(), "drivers", "http.js"));
require(path.resolve(process.cwd(), "streams", "jobs", "showMemoryUsage.js"));

const defaultUrl = "https://www.gutenberg.org/files/2701/old/moby10b.txt";
// const defaultUrl = "https://old-releases.ubuntu.com/releases/lunar/ubuntu-23.04-beta-live-server-ppc64el.iso";

// ram memory consumption increases as the size of the downloaded file increases
module.exports = async function (url = defaultUrl, serverUrl = config.UPLOAD_URL) {

    const readableStream = await completeHttpStreamJob(url);
    let downloaded = 0;
    // readableStream.data.on("data", function (chunk) {
        // downloaded += chunk.length;
        // console.log("receiving", formatBytesJob(downloaded));
    // });
    await httpDriver.post(serverUrl, readableStream.data.pipe(uppercaseStreamJob()), {
        headers: {
            "Content-Length": readableStream.headers["content-length"],
            "content-disposition": "attachment; filename="+path.basename(url),
            "Content-Type": "application/octet-stream"
            // "Content-Type": "application/x-iso9660-image"
        }
    });

};
