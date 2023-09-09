const path = require('path');
const fs = require('fs');
const koa = require('koa');
const koa_mount = require('koa-mount');

const game = require('./game');

const PORT = 7777;

const TEMPLATE_DIR = path.resolve(__dirname, './template/index.html');

let player_won_count = 0,
    same_count = 0,
    last_player_action = null,
    player_won_random = 1;

const player_result_selection = {
    '-1': '你输了!',
    0: '平局!',
    1: '你赢了!'
};

const app = new koa();
const game_app = new koa();

const html_template = fs.readFileSync(TEMPLATE_DIR, 'utf-8');

app.use(koa_mount('/favicon.ico', ctx => {
    const {response} = ctx;
    response.status = 200;
    response.body = '';
    return true;
}));

app.use(koa_mount('/game', game_app));

app.use(koa_mount('/', ctx => {
    const {response} = ctx;
    response.status = 200;
    response.type = 'html';
    response.body = html_template;
}));

game_app.use(async (ctx, next) => {
    const {response} = ctx;

    if (player_won_count >= 3 || same_count === 9) {
        response.status = 500;
        response.body = '你太厉害了!我不跟你玩儿了!';
        return false;
    }

    await next();

    if (ctx.player_won)
        player_won_count++;
});

game_app.use(async (ctx, next) => {
    const {request, response} = ctx;
    const {query: {action}} = request;

    if (typeof action === 'undefined') {
        response.status = 400;
        response.body = '';
        return false;
    }

    if (last_player_action && last_player_action === action) {
        same_count++;
        if (same_count >= 3) {
            same_count = 9;
            response.status = 500;
            response.body = '你作弊!';
            return false;
        }
    } else {
        same_count = 0;
    }
    last_player_action = action;

    ctx.action = action;

    await next();
});

game_app.use(async (ctx) => {
    const {action, response} = ctx;
    const result_random = game(action);
    const result = player_result_selection[result_random];

    await new Promise(resolve => {
        setTimeout(() => {
            if (result_random === player_won_random)
                ctx.player_won = true;
            resolve();
        }, 1000);
    });

    response.status = 200;
    response.body = result;
});

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});