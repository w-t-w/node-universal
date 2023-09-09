// const http = require('http');
// const fs = require('fs');
//
// const PORT = 7777;
//
// const server = http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end('hello geekTime!');
// });
//
// server.listen(PORT, () => {
//     console.log(`The server is running at http://localhost:${PORT}!`);
// });
const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 7777;

const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

const server = http.createServer((req, res) => {
    res.writeHead(200);
    fs.createReadStream(TEMPLATE_DIR).pipe(res);
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});