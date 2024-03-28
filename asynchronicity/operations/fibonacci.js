const path = require("path");
const process = require("process");

const fibonacciJob = require(path.resolve(process.cwd(), "asynchronicity", "jobs", "fibonacci"));


process.on('message', function(n) {

    process.send(fibonacciJob(n));
    process.disconnect();

});
