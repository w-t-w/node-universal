const Koa = require('koa');
const koa_graphql = require('koa-graphql');

const schema = require('./schema');

const PORT = 7777;

const koa = new Koa();

const app = koa.use(koa_graphql.graphqlHTTP({
    schema
}));

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});
