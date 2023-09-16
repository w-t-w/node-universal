const fs = require('fs');
const path = require('path');

const PROTO_DIR = path.resolve(process.cwd(), './framework/workspace/src/proto/columns.proto');

const proto_file = fs.readFileSync(PROTO_DIR, 'utf-8');

const framework_config = {
    columns: {
        protocol: 'rpc',
        ip: '127.0.0.1',
        port: 4000,
        timeout: 500,
        protoFile: proto_file,
        requestSchema: 'DetailRequest',
        responseSchema: 'DetailResponse',
        before(data) {
            return data;
        },
        then(data) {
            return data.columns;
        },
        catch() {
        }
    },
    articles: {
        protocol: 'http',
        url: 'http://127.0.0.1:3000',
        then(data) {
            return JSON.parse(data).data.list;
        }
    }
};

module.exports = framework_config;

