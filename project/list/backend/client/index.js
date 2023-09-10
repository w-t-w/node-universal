const path = require('path');
const koa = require('koa');
const koaMount = require('koa-mount');
const koaStatic = require('koa-static');
const {renderToString} = require('react-dom/server');

const rpc_client = require('./lib');
const create_template = require('../template');
const App = require('../build/ssr_index');

const STATIC_DIR = path.resolve(process.cwd(), './project/list/backend/source');
const TEMPLATE_DIR = path.resolve(process.cwd(), './project/list/backend/template/index.html');

const PORT = 4000;

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
    const {query: {sort = 0, filter = 0}} = request;

    if (typeof sort === 'undefined' || typeof filter === 'undefined') {
        response.status = 400;
        response.body = '';
        return false;
    }

    const result = await new Promise((resolve, reject) => {
        rpc_client.write({
            sort,
            filter
        }, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });

    const template = create_template(TEMPLATE_DIR);
    const renderString = renderToString(App(result));
    response.status = 200;
    response.body = template({
        renderString,
        renderData: result,
        sort,
        filter
    });
}));

app.listen(PORT, () => {
    console.log(`The client page is running at http://localhost:${PORT}!`);
});