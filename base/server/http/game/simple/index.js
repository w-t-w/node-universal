const http = require('http');
const fs = require('fs');
const path = require('path');
const {parse} = require('url');
const queryString = require('querystring');

const game = require('./game');

const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

const PORT = 7777;

const resultSelection = {
    ['-1']: '你输了!',
    0: '平局!',
    1: '你赢了!',
};

const playerWonResult = 1;
let playerWonCount = 0,
    lastPlayerResult = null,
    sameCount = 0;

const server = http.createServer((req, res) => {
    const {url} = req;
    const {pathname, query} = parse(url);
    const {action} = queryString.parse(query);

    if (pathname === '/favicon.ico') {
        res.writeHead(200);
        res.end('');
        return true;
    }

    if (pathname === '/data') {
        if (playerWonCount >= 3 || sameCount === 9) {
            res.writeHead(500);
            res.end('你太厉害了!我不跟你玩儿了!');
            return false;
        }

        if (typeof action === 'undefined') {
            res.writeHead(400);
            res.end('');
            return false;
        }

        const result = game(action);
        const requestResult = resultSelection[result];

        if (lastPlayerResult && lastPlayerResult === action) {
            sameCount++;
            if (sameCount >= 3) {
                sameCount = 9;
                res.writeHead(500);
                res.end('你作弊!');
                return false;
            }
        } else {
            sameCount = 0;
        }
        lastPlayerResult = action;

        if (result === playerWonResult) {
            playerWonCount++;
        }

        res.writeHead(200);
        res.end(requestResult);
    }

    if (pathname === '/') {
        res.writeHead(200);
        // fs.createReadStream(TEMPLATE_DIR).pipe(res);
        res.end(fs.readFileSync(TEMPLATE_DIR, 'utf-8'));
    }
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});