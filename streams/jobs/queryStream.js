"use strict";

const path = require("path");
const baseConnection = require(path.resolve(process.cwd(), "drivers", "mysql", "baseConnection"));
const stream = require("stream");
const util = require("util");

function StringifyStream(options) {
    if (!(this instanceof StringifyStream))
        return new StringifyStream(options);

    options = options || {};
    options.objectMode = true;

    stream.Transform.call(this,options);
}

util.inherits(StringifyStream,stream.Transform);

StringifyStream.prototype._transform = function(d,e,callback) {
    //http://ndjson.org/

    this.push(JSON.stringify(d));
    callback();
};



module.exports = function (sqlString, values) {

    const readableStream = baseConnection.connection.query(sqlString, values)
        .stream({
            // highWaterMark: 5,
            // encoding: 'utf8',
            // objectMode: true
        });

    // return readableStream;
    return readableStream.pipe(StringifyStream());

}
