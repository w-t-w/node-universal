const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const koa_mount = require('koa-mount');
const koa_static = require('koa-static');
const koa_graphql = require('koa-graphql');

const schema = require('./config');

const STATIC_DIR = path.resolve(process.cwd(), './project/video/source');
const TEMPLATE_DIR = path.resolve(process.cwd(), './project/video/template/index.html');

const PORT = 4001;

const koa = new Koa();

const template = fs.readFileSync(TEMPLATE_DIR, 'utf-8');

koa.use(koa_static(STATIC_DIR));

koa.use(koa_mount('/api', koa_graphql.graphqlHTTP({
    schema
})));

koa.use(koa_mount('/', ctx => {
    const {request, response} = ctx;
    response.status = 200;
    response.body = template;
}));

koa.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});

