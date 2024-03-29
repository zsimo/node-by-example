"use strict";

const mysql = require("mysql")
const path = require("path");
const config = require(path.resolve(process.cwd(), "config"));

const connection = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    port: config.DB_PORT
});


connection.connect(function (err) {
    if (err) {
        throw err;
    }
});


module.exports = {
    query: function (query, payload) {

        return new Promise(function (resolve, reject) {
            connection.query(query, payload,
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }

                }
            );
        });

    },
    connection: connection
};
