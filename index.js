"use strict";

function sleep (msec) {
    let i = 0
    const start = Date.now()
    while (Date.now() - start < msec) { i++ }
    return i
}

function uno () {
    console.log(1);
}
function due () {
    console.log(2);
}


const start = Date.now();
uno();

setTimeout(function () {
    sleep(5000);
    console.log("time", Date.now() - start);
},0);

due();

