const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const game = require('./game');

const PORT = 7777;

const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

const player_result_selection = {
    '-1': '你输了!',
    0: '平局!',
    1: '你赢了!'
};

let player_won_count = 0,
    player_won_random = 1,
    last_player_action = null,
    same_count = 0;

const server = http.createServer((req, res) => {
    const {pathname, query} = url.parse(req.url);
    if (pathname === '/favicon.ico') {
        res.writeHead(200);
        res.end('');
        return true;
    }
    if (pathname === '/game') {
        if (player_won_count >= 3 || same_count === 9) {
            res.writeHead(500);
            res.end('你太厉害了!我不跟你玩儿了!');
            return false;
        }

        const {action} = querystring.parse(query);

        if (typeof action === 'undefined') {
            res.writeHead(400);
            res.end('');
            return false;
        }

        if (last_player_action && last_player_action === action) {
            same_count++;
            if (same_count >= 3) {
                same_count = 9;
                res.writeHead(500);
                res.end('你作弊!');
                return false;
            }
        } else {
            same_count = 0
        }
        last_player_action = action;

        const result_random = game(action);
        const result = player_result_selection[result_random];

        if (result_random === player_won_random) {
            player_won_count++;
        }

        res.writeHead(200);
        res.end(result);
    }
    if (pathname === '/') {
        res.writeHead(200);
        fs.createReadStream(TEMPLATE_DIR).pipe(res);
    }
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});