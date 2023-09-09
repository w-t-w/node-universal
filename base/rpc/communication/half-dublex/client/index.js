const net = require('net');

const PORT = 7777,
    HOST = '127.0.0.1';

const package_header_length = 2,
    package_length = 4;

let index = null,
    id = null,
    seq = 0;

const lesson_id = [
    "136797",
    "136798",
    "136799",
    "136800",
    "136801",
    "136803",
    "136804",
    "136806",
    "136807",
    "136808",
    "136809",
    "141994",
    "143517",
    "143557",
    "143564",
    "143644",
    "146470",
    "146569",
    "146582"
];

const socket = new net.Socket({});

socket.connect({
    host: HOST,
    port: PORT,
    keepAlive: true
});

index = Math.floor(Math.random() * lesson_id.length);
id = lesson_id[index];
socket.write(encode(id));

socket.on('data', buffer => {
    const {seq, result} = decode(buffer);
    console.log(`数组下标为 ${index} 的包头序号为 ${seq + 1} 的课程 id 为 ${id} 的课程为 ${result}!`);

    index = Math.floor(Math.random() * lesson_id.length);
    id = lesson_id[index];
    socket.write(encode(id));
});

function encode(id) {
    const header = Buffer.alloc(package_header_length);
    header.writeInt16BE(seq++);
    const body = Buffer.alloc(package_length);
    body.writeInt32BE(id);
    return Buffer.concat([header, body]);
}

function decode(buffer) {
    const seq = buffer.readInt16BE();
    const body = buffer.slice(package_header_length);
    const result = body.toString();
    return {
        seq,
        result
    };
}