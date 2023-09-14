const {buildSchema} = require('graphql');

const comments = require('../data/comments');

const schema = buildSchema(`
    type Comment {
        id: Int
        avatar: String
        name: String
        isTop: Boolean
        content: String
        publishDate: String
        commentNum: Int
        praiseNum: Int
    }
    type Query {
        comments: [Comment]
    }
`);

schema.getQueryType().getFields().comments.resolve = () => {
    return comments;
};

module.exports = schema;