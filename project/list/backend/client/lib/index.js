const path = require('path');
const fs = require('fs');
const EasySock = require('easy_sock');
const protobuf = require('protocol-buffers');

const PROTO_DIR = path.resolve(process.cwd(), './project/list/backend/proto/list.proto');

const PORT = 7777,
    IP = '127.0.0.1',
    TIMEOUT = 500;

const package_header_length = 8,
    seq_length = 4;

const {ListRequest, ListResponse} = protobuf(fs.readFileSync(PROTO_DIR, 'utf-8'));

const socket = new EasySock({
    ip: IP,
    port: PORT,
    timeout: TIMEOUT,
    keepAlive: true
});

socket.encode = (data, seq) => {
    const body = ListRequest.encode(data);
    const body_length = body.length;
    const header = Buffer.alloc(package_header_length);
    header.writeInt32BE(seq);
    header.writeInt32BE(body_length, seq_length);
    return Buffer.concat([header, body]);
};

socket.decode = buffer => {
    const seq = buffer.readInt32BE();
    const body = buffer.slice(package_header_length);
    const result = ListResponse.decode(body);
    return {
        result,
        seq
    };
};

socket.isReceiveComplete = buffer => {
    if (buffer.length <= package_header_length)
        return 0;
    const body_length = buffer.readInt32BE(seq_length);
    if (buffer.length >= body_length + package_header_length)
        return body_length + package_header_length;
    else
        return 0;
};

module.exports = socket;