const fs = require('fs');
const path = require('path');
const koa = require('koa');
const koaMount = require('koa-mount');
const koaStatic = require('koa-static');

const tcpClient = require('./lib');

const PORT = 3000;

const STATIC_DIR = path.resolve(process.cwd(), './source');
const TEMPLATE_DIR = path.resolve(STATIC_DIR, './index.html');

const template = fs.readFileSync(TEMPLATE_DIR);

const app = new koa();

app.use(koaStatic(STATIC_DIR));

app.use(koaMount('/favicon.ico', ctx => {
    const {response} = ctx;
    response.status = 200;
    response.body = '';
    return true;
}));

app.use(koaMount('/', async ctx => {
    const {request, response} = ctx;
    const {query: {column_id}} = request;

    if (typeof column_id === 'undefined') {
        response.status = 400;
        response.body = '';
        return false;
    }

    const result = await new Promise((resolve, reject) => {
        tcpClient.write({
            column_id
        }, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });


    response.status = 200;
    response.type = 'html';
    response.body = template;
}));

app.listen(PORT, () => {
    console.log(`The client page is running at http://localhost:${PORT}!`);
});

