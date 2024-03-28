const http = require("http");
const server = http.createServer((req, res) => {
    res.end("ciao\r\n");
});
server.listen(8000);
