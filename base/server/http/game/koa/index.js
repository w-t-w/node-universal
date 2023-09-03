const koa = require('koa');
const fs = require('fs');
const path = require('path');
const koaMount = require('koa-mount');

const game = require('./game');

const PORT = 7777;

const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

const resultSelection = {
    ['-1']: '你输了!',
    0: '平局!',
    1: '你赢了!'
};

let playerWonCount = 0,
    lastPlayerAction = null,
    sameCount = 0,
    playerWonResult = 1;

const app = new koa();
const gameApp = new koa();

app.use(koaMount('/favicon', ctx => {
    const {response} = ctx;
    response.status = 200;
    response.body = '';
    return true;
}));

app.use(koaMount('/data', gameApp));

app.use(koaMount('/', ctx => {
    const {response} = ctx;
    response.status = 200;
    response.body = fs.readFileSync(TEMPLATE_DIR, 'utf-8');
}));

gameApp.use(async (ctx, next) => {
    const {response} = ctx;

    if (playerWonCount >= 3 || sameCount === 9) {
        response.status = 500;
        response.body = '你太厉害了!我不跟你玩儿了!';
        return false;
    }

    await next();

    if (ctx.playerWon) {
        playerWonCount++;
    }
});

gameApp.use(async (ctx, next) => {
    const {request: {query: {action}}, response} = ctx;

    if (typeof action === 'undefined') {
        response.status = 400;
        response.body = '';
        return false;
    }

    const result = game(action);
    const resultRequest = resultSelection[result];

    if (lastPlayerAction && lastPlayerAction === action) {
        sameCount++;
        if (sameCount >= 3) {
            sameCount = 9;
            response.status = 500;
            response.body = '你作弊!';
            return false;
        }
    } else {
        sameCount = 0;
    }
    lastPlayerAction = action;

    await new Promise(resolve => {
        setTimeout(() => {
            if (result === playerWonResult) {
                ctx.playerWon = true;
            }
            resolve();
        }, 1000);
    });

    ctx.resultRequest = resultRequest;

    await next();
});

gameApp.use(ctx => {
    const {response, resultRequest} = ctx;
    response.status = 200;
    response.body = resultRequest;
});

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});