"use strict";

const path = require("path");
const process = require("process");
const { readdir } = require("fs/promises");
const mysqlServicesDirectory = path.resolve(process.cwd(), "mysql", "services");
const streamsServicesDirectory = path.resolve(process.cwd(), "streams", "services");
const args = process.argv.slice(2);


const serviceName = path.parse(args[0]).name;

function _readDirMapCallback (service) {
    return path.parse(service).name;
}

async function main () {


    let availableServices = (await readdir(mysqlServicesDirectory)).map(_readDirMapCallback)
        .concat((await readdir(streamsServicesDirectory)).map(_readDirMapCallback));

    if (availableServices.indexOf(serviceName) !== -1) {
        let service;
        try {
            service = require(path.resolve(mysqlServicesDirectory, serviceName));
        } catch (e) {
            service = require(path.resolve(streamsServicesDirectory, serviceName));
        }

        try {
            const start = Date.now();
            await service(...args.slice(1));
            console.log("time", Date.now() - start);
            process.exit(0);
        } catch (e) {
            console.error(e);
            process.exit(1);
        }


    } else {
        throw new Error("Invalid service: " + serviceName);
    }

}


main();
