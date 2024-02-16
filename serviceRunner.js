"use strict";

const path = require("path");
const process = require("process");
const { readdir } = require("fs/promises");
const servicesDirectory = path.resolve(process.cwd(), "mysql", "services");
const args = process.argv.slice(2);

const serviceName = path.parse(args[0]).name;

async function main () {


    const availableServices = (await readdir(servicesDirectory)).map(function (service) {
        return path.parse(service).name;
    });

    if (availableServices.indexOf(serviceName) !== -1) {

        try {
            const service = require(path.resolve(servicesDirectory, serviceName));
            const start = Date.now();
            await service(...args.slice(1));
            console.log(Date.now() - start);
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
