const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 7777;

const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

const buffer = fs.readFileSync(TEMPLATE_DIR, 'utf-8');

// const leak = [];

const server = http.createServer((req, res) => {
    // console.log(window.location.href);
    // leak.push(buffer);
    res.writeHead(200);
    res.end(buffer);
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
    // while (true) {
    // }
})