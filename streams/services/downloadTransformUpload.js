"use strict";

const path = require("path");
const process = require("process");
const completeHttpStreamJob = require(path.resolve(process.cwd(), "streams", "jobs", "completeHttpStream.js"));
const formatBytesJob = require(path.resolve(process.cwd(), "streams", "jobs", "formatBytes.js"));
const config = require(path.resolve(process.cwd(), "config.js"));
const uppercaseStreamJob = require(path.resolve(process.cwd(), "streams", "jobs", "uppercaseStream.js"));

const defaultUrl = "https://www.gutenberg.org/files/2701/old/moby10b.txt";

module.exports = async function (url = defaultUrl, serverUrl = config.UPLOAD_URL) {

    const readableStream = await completeHttpStreamJob(url);
    let downloaded = 0;
    readableStream.on("data", function (chunk) {
        downloaded += chunk.length;
        console.log("receiving", formatBytesJob(downloaded));
    });
    await axios.post(serverUrl, readableStream.data.pipe(uppercaseStreamJob()), {
        headers: {
            "Content-Length": readableStream.headers["content-length"],
            "content-disposition": "attachment; filename=out.txt",
            "Content-Type": "application/octet-stream"
        }
    });

};
