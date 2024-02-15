"use strict";

const mysql = require("mysql")
const path = require("path");
const config = require(path.resolve(process.cwd(), "config"));



module.exports = {
    query: function (query, payload) {

        const connection = mysql.createConnection({
            host: config.DB_HOST,
            user: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_DATABASE,
            port: config.DB_PORT
        });


        connection.connect();

        return new Promise(function (resolve, reject) {
            connection.query(query, payload,
                function (error, results, fields) {
                    connection.end();
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }

                }
            );
        });


    }
};
