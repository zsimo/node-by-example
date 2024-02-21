"use strict";

const { Transform } = require("stream");
const { scrypt } = require("crypto");

module.exports = function () {
    return new Transform({
        decodeStrings: false,
        encoding: 'hex',
        transform (chunk, enc, next) {
            scrypt(chunk, 'a-salt', 32, (err, key) => {
                if (err) {
                    next(err)
                    return
                }
                next(null, key)
            })
        },
        final (cb) {
            // this.push('\n]\n')
            cb();
        }
    })
};
