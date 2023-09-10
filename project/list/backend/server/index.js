const fs = require('fs');
const path = require('path');
const protobuf = require('protocol-buffers');

const RPC = require('./lib');

const list = require('./data/list');

const PROTO_DIR = path.resolve(process.cwd(), './project/list/backend/proto/list.proto');

const PORT = 7777;

const sort_selection = {
    1: (a, b) => {
        return a.id - b.id;
    },
    2: (a, b) => {
        return a.sub_count - b.sub_count;
    },
    3: (a, b) => {
        return a.column_price - b.column_price;
    }
};

const filter_none = 0;

const {ListRequest, ListResponse} = protobuf(fs.readFileSync(PROTO_DIR, 'utf-8'));

const rpc = RPC(ListResponse, ListRequest);

const server = rpc.createServer((req, res) => {
    const {body: {sort, filter}} = req;
    console.log(`sort: ${sort}, filter: ${filter}`);

    //...

    res.end({
        columns: list.sort(sort_selection[sort]).filter(item => filter === filter_none ? item : item.type === filter)
    });
});

server.listen(PORT, () => {
    console.log(`The backend server is running at http://localhost:${PORT}!`);
});
