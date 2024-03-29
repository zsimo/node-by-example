"use strict";
// see https://gist.github.com/zentala/1e6f72438796d74531803cc3833c039c
module.exports = function (bytes, decimals) {
    if (bytes === 0) {
        return '0 Bytes'
    }
    var k = 1024,
        dm = decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};

