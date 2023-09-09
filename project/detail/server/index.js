const path = require('path');
const fs = require('fs');
const protobuf = require('protocol-buffers');

const RPC = require('./lib');
const columns = require('./data');

const PORT = 7777;

const PROTO_DIR = path.resolve(process.cwd(), './project/detail/proto/detail.proto');

const {DetailRequest, DetailResponse} = protobuf(fs.readFileSync(PROTO_DIR, 'utf-8'));

const rpc_server = RPC(DetailResponse, DetailRequest);

const server = rpc_server.createServer((req, res) => {
    const {body} = req;
    const {column_id} = body;
    console.log(`column_id: ${column_id}`);

    //...

    res.end({
        column: columns[0],
        recommend_columns: [columns[1], columns[2], columns[3], columns[4]]
    });
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
})

