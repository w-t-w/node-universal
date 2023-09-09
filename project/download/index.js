const fs = require('fs');
const path = require('path');
const koa = require('koa');
const koaMount = require('koa-mount');
const koaStatic = require('koa-static');

const PORT = 7777;

const ROOT_DIR = path.resolve(__dirname, './source');
const TEMPLATE_DIR = path.resolve(__dirname, './source/index.html');

const app = new koa();

app.use(koaStatic(ROOT_DIR));

app.use(koaMount('/favicon.ico', ctx => {
    const {response} = ctx;
    response.status = 200;
    response.body = '';
    return true;
}));

app.use(koaMount('/', ctx => {
    const {response} = ctx;
    response.status = 200;
    response.body = fs.readFileSync(TEMPLATE_DIR, 'utf-8');
}));

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
})