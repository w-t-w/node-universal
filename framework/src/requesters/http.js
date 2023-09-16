const request = require('request');
const query_string = require('querystring');

let url = null;

const http_requester = {
    // http 编译
    compile(config) {
        url = config.url;
    },
    // http 请求
    request(data) {
        const query_stringify = query_string.stringify(data);
        return new Promise((resolve, reject) => {
            request(`${url}?${query_stringify}`, (error, response, body) => {
                error ? reject(error) : resolve(body);
            });
        });
    }
}

module.exports = http_requester;