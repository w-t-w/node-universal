const Koa = require('koa');
const koa_graphql = require('koa-graphql');

const schema = require('./config');

const PORT = 4001;

const koa = new Koa();

koa.use(koa_graphql.graphqlHTTP({
    schema
}));

koa.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});

