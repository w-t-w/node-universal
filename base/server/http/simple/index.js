const http = require('http');

const PORT = 7777;

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(200);
        res.end('');
        return true;
    }
    res.writeHead(200);
    res.end('hello GeekBang!');
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});