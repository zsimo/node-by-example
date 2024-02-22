"use strict";

const { Transform } = require("stream");

module.exports = function () {
    return new Transform({
        transform (chunk, enc, next) {
            const newText = chunk.toString().toUpperCase();
            next(null, newText);
        },
        final (cb) {
            cb();
        }
    })
};
