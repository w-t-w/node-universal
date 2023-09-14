const {graphql, buildSchema} = require('graphql');

const schema = buildSchema(`
    type Query {
        introduce: String
    }
`);
const rootValue = {
    introduce() {
        return 'I\'m Gary~29 year\'s old~';
    }
};
const source = '{ introduce }';

graphql({schema, source, rootValue}).then(result => {
    console.log(`result: ${result.data.introduce}`);
});