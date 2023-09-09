const path = require('path');
const koa = require('koa');
const koaMount = require('koa-mount');
const koaStatic = require('koa-static');

const tcp_client = require('./lib');
const create_template = require('../template');

const PORT = 3000;

const STATIC_DIR = path.resolve(process.cwd(), './project/detail/source');
const TEMPLATE_DIR = path.resolve(process.cwd(), './project/detail/template/index.html');

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
        tcp_client.write({
            column_id
        }, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });

    const template = create_template(TEMPLATE_DIR);
    const template_result = template(result);

    response.status = 200;
    response.body = template_result;
}));

app.listen(PORT, () => {
    console.log(`The client page is running at http://localhost:${PORT}!`);
});

