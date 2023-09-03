const express = require('express');
const path = require('path');
const fs = require('fs');

const game = require('./game');

const TEMPLATE_DIR = path.resolve(__dirname, 'template', 'index.html');

const resultSelection = {
    ['-1']: '你输了!',
    0: '平局!',
    1: '你赢了!'
};

const PORT = 7777;

let playerWonCount = 0,
    sameCount = 0,
    lastPlayerAction = null,
    playerWonResult = 1;

const app = express();

app.get('/favicon.ico', (req, res) => {
    res.status(200);
    res.send('');
    return true;
});

app.get('/data', (req, res, next) => {
    if (playerWonCount >= 3 || sameCount === 9) {
        res.status(500);
        res.send('你太厉害了!我不跟你玩儿了!');
        return false;
    }

    next();

    if (res.playerWon) {
        playerWonCount++;
    }
}, (req, res, next) => {
    const {query: {action}} = req;

    if (typeof action === 'undefined') {
        res.status(400);
        res.send('');
        return false;
    }

    const result = game(action);
    const resultRequest = resultSelection[result];

    if (lastPlayerAction && lastPlayerAction === action) {
        sameCount++;
        if (sameCount >= 3) {
            sameCount = 9;
            res.status(500);
            res.send('你作弊!');
            return false;
        }
    } else {
        sameCount = 0;
    }
    lastPlayerAction = action;

    setTimeout(() => {
        if (result === playerWonResult) {
            res.playerWon = true;
        }
        res.resultRequest = resultRequest;
        next();
    }, 2000);
}, (req, res) => {
    const {resultRequest} = res;
    res.status(200);
    res.send(resultRequest);
});

app.get('/', (req, res) => {
    res.status(200);
    res.send(fs.readFileSync(TEMPLATE_DIR, 'utf-8'));
});

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});