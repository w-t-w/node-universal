const express = require('express');
const fs = require('fs');
const path = require('path');

const game = require('./game');

const PORT = 7777;

const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

let player_won_count = 0,
    last_player_action = null,
    player_won_random = 1,
    same_count = 0;

const player_result_selection = {
    '-1': '你输了!',
    0: '平局!',
    1: '你赢了!'
};

const app = express();

app.get('/favicon.ico', (req, res) => {
    res.status(200);
    res.send('');
    return true;
});

app.get('/game', (req, res, next) => {
    if (player_won_count >= 3 || same_count === 9) {
        res.status(500);
        res.send('你太厉害了!我不跟你玩儿了!');
        return false;
    }

    next();

    if (res.player_won)
        player_won_count++;
}, (req, res, next) => {
    const {query: {action}} = req;

    if (typeof action === 'undefined') {
        res.status(400);
        res.send('');
        return false;
    }

    if (last_player_action && last_player_action === action) {
        same_count++;
        if (same_count >= 3) {
            same_count = 9;
            res.status(500);
            res.send('你作弊!');
            return false;
        }
    } else {
        same_count = 0;
    }
    last_player_action = action;

    res.action = action;

    next();
}, async (req, res) => {
    const {action} = res;

    const result_random = game(action);
    const result = player_result_selection[result_random];

    await setTimeout(() => {
        if (result_random === player_won_random)
            res.player_won = true;
        res.status(200);
        res.send(result);
    }, 500);
});

app.get('/', (req, res) => {
    res.status(200);
    res.send(fs.readFileSync(TEMPLATE_DIR, 'utf-8'));
});

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});