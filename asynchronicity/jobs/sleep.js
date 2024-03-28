
module.exports = function sleep (msec) {
    let i = 0
    const start = Date.now()
    while (Date.now() - start < msec) { i++ }
    return i
}
