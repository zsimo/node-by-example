"use strict";

module.exports = async function (connection, sqlString, values) {

        let response;
        try {
            response = await connection.query(sqlString, values);
        } catch (e) {
            response = e.response;
        }
        console.log(response.length ? "Found" : "NotFound");

}
