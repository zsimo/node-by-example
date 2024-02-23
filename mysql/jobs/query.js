"use strict";

module.exports = async function (connection, sqlString, values) {

        if (values) {
            console.log(arguments[1] + JSON.stringify(arguments[2]));
        }
        let response;
        try {
            response = await connection.query(sqlString, values);
        } catch (e) {
            response = e.response;
            console.log(e)
        }
        if (values) {
            console.log(response && response.length ? "Found" : "NotFound", " #id" + values[0]);
        }

        return response;

}
