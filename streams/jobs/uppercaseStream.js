"use strict";

const { Transform } = require("stream");

module.exports = function () {
    return new Transform({
        transform (chunk, enc, next) {
            next(null, chunk.toString().toUpperCase());
        },
        final (cb) {
            cb();
        }
    })
};
