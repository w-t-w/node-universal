const http = require('http');

const articles = require('./data/articles');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify(articles));
});

server.listen(PORT, () => {
    console.log(`The article server is running at http://localhost:${PORT}!`);
});

