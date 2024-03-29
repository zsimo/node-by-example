"use strict";

const path = require("path");
const process = require("process");
const fs = require("fs");
const { pipeline } = require("node:stream/promises");
const httpStreamJob = require(path.resolve(process.cwd(), "streams", "jobs", "httpStream.js"));
const formatBytesJob = require(path.resolve(process.cwd(), "streams", "jobs", "formatBytes.js"));
const uppercaseStreamJob = require(path.resolve(process.cwd(), "streams", "jobs", "uppercaseStream.js"));
require(path.resolve(process.cwd(), "streams", "jobs", "showMemoryUsage.js"));

// const defaultUrl = "https://www.gutenberg.org/files/2701/old/moby10b.txt";
const defaultUrl = "https://old-releases.ubuntu.com/releases/lunar/ubuntu-23.04-beta-live-server-ppc64el.iso";


module.exports = async function (url = defaultUrl, target = './out.txt') {


    const readableStream = await httpStreamJob(url);
    let downloaded = 0;
    // readableStream.on("data", function (chunk) {
    //     downloaded += chunk.length;
    //     console.log("receiving", formatBytesJob(downloaded));
    // });
    const writableStream = fs.createWriteStream(target);

    return pipeline (
        readableStream,
        uppercaseStreamJob(),
        writableStream
    );

};
