"use strict";




const a = new Promise(function (res) {
    setTimeout(function () {
        res("ciao");
    }, 1000);
})

a.then(function (result) {
    console.log(result)
    console.log(a);
})
console.log(a.status);
