const path = require('path');
const fs = require('fs');
const protobuf = require('protocol-buffers');

const {rpc} = require('./lib');
const columns = require('./data/columns');

const PROTO_DIR = path.resolve(process.cwd(), './framework/server/detail/proto/columns.proto');

const PORT = 4000;

const {DetailResponse, DetailRequest} = protobuf(fs.readFileSync(PROTO_DIR, 'utf-8'));
const rpc_server = rpc(DetailResponse, DetailRequest);

const server = rpc_server.createServer((request, response) => {
    const {body: {column_id}} = request;
    console.log(`column_id: ${column_id}`);

    //...

    response.end({
        columns: columns[0],
        recommend_columns: [columns[1], columns[2], columns[3], columns[4]]
    });
});

server.listen(PORT, () => {
    console.log(`The detail server is running at http://localhost:${PORT}!`);
});

