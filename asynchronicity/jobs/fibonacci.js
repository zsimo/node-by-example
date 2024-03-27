"use strict";

/**
 * Function to calculate the nth Fibonacci number recursively.
 *
 * Produced by ChatGpt 3.5, answering the question:
 * "can you please provide an example of a heavy intensive function call in node.js"
 *
 * @param {number} n
 * @returns {number}
 */
function fibonacci(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}



module.exports = fibonacci;
