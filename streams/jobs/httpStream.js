"use strict";

const path = require("path");
const httpDriver = require(path.resolve(process.cwd(), "drivers", "http.js"));

module.exports = async function (url) {
    const response = await httpDriver({
        method: 'get',
        url: url,
        responseType: 'stream'
    });
    return response.data;
};
