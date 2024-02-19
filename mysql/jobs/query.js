"use strict";

module.exports = async function (connection, sqlString, values) {

        console.log(arguments[1] + JSON.stringify(arguments[2]));
        let response;
        try {
            response = await connection.query(sqlString, values);
        } catch (e) {
            response = e.response;
        }
        console.log(response.length ? "Found" : "NotFound", " #id" + values[0]);

}
