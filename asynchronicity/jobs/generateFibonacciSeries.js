
"use strict";

module.exports = function generateFibonacciSeries(numTerms) {
    let fibonacciSeries = [0, 1]; // Initialize with first two terms of Fibonacci series

    // Generate subsequent terms
    for (let i = 2; i < numTerms; i++) {
        fibonacciSeries.push(fibonacciSeries[i - 1] + fibonacciSeries[i - 2]);
    }

    return fibonacciSeries;
};
