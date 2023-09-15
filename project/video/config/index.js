const fs = require('fs');
const path = require('path');
const {buildSchema} = require('graphql');

const comments = require('../data/comments');

const GQL_PATH = path.resolve(process.cwd(), './project/video/gql/comments.gql');

const gql = fs.readFileSync(GQL_PATH, 'utf-8');

const schema = buildSchema(gql);

schema.getQueryType().getFields().comments.resolve = () => {
    return comments;
};

schema.getMutationType().getFields().parise.resolve = (argv0, {id}) => {
    comments[id - 1]['pariseNum']++;
};

module.exports = schema;