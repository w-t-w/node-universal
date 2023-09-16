const Koa = require('koa');
const koa_mount = require('koa-mount');
const koa_static = require('koa-static');

module.exports = (async (config) => {
    const koa = new Koa();

    koa.use(koa_mount('/favicon.ico', ctx => {
        const {response} = ctx;
        response.status = 200;
        response.body = '';
        return true;
    }));
});