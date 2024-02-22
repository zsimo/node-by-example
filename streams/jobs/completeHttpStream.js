"use strict";

const path = require("path");
const httpDriver = require(path.resolve(process.cwd(), "drivers", "http.js"));

module.exports = function (url) {
    return httpDriver({
        method: 'get',
        url: url,
        responseType: 'stream'
    });
};
