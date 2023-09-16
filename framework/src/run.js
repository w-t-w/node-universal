const path = require('path');
const Koa = require('koa');
const koa_mount = require('koa-mount');
const koa_static = require('koa-static');

const factory = require('./factory');
const createTemplate = require('./template');

const STATIC_DIR = path.resolve(__dirname, 'source');

module.exports = ((config) => {
    const koa = new Koa();

    koa.use(koa_static(STATIC_DIR));

    koa.use(koa_mount('/favicon.ico', async ctx => {
        const {response} = ctx;
        response.status = 200;
        response.body = '';
        return true;
    }));

    Object.entries(config).map(([router, router_config]) => {
        const {data_config, template_config} = router_config;

        const router_koa = new Koa();
        const factory_data_config = Object.entries(data_config).reduce((res, [symbol, requester_config]) => {
            const protocol = requester_config.protocol;
            factory.createRequester(protocol);
            res[symbol] = factory(requester_config);
            return res;
        }, {});

        const {path, content} = template_config;
        const template = createTemplate(path, content);

        koa.use(koa_mount(router, router_koa));
        router_koa.use(async ctx => {
            const {request: {query}, response} = ctx;

            const result = {};

            await Promise.all(Object.entries(factory_data_config).map(([symbol, factory_data]) => {
                return factory_data(query)
                    .then(res => {
                        result[symbol] = res.result;
                        return res.result;
                    });
            }));

            try {
                response.status = 200;
                response.body = template(result);
            } catch (e) {
                response.status = 500;
                response.body = e.stack;
            }
        });
    });

    return koa;
});