const net = require('net');

const HOST = '127.0.0.1',
    PORT = 7777;

const packageLength = 4,
    seqLength = 2;

const lessonIds = [
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
const lessonIds_length = lessonIds.length;

const socket = new net.Socket({});

socket.connect({
    host: HOST,
    port: PORT,
    keepAlive: true
});

let index = Math.floor(Math.random() * lessonIds_length),
    id = lessonIds[index],
    seq = 0;

socket.write(encode(id));
socket.on('data', buffer => {
    const {seq, result} = decode(buffer);
    console.log(`包头为 ${seq} 的包,课程 id 为 ${id},课程为 ${result}`);
    // index = Math.floor(Math.random() * lessonIds_length);
    // id = lessonIds[index];
    // socket.write(encode(id));
});

for (let k = 0; k < 100; k++) {
    index = Math.floor(Math.random() * lessonIds_length);
    id = lessonIds[index];
    socket.write(encode(id));
}

function encode(id) {
    const body = Buffer.alloc(packageLength);
    body.writeInt32BE(id);
    const header = Buffer.alloc(seqLength);
    header.writeInt16BE(seq++);
    return Buffer.concat([header, body]);
}

function decode(buffer) {
    const body = buffer.slice(seqLength);
    const result = body.toString();
    const seq = buffer.readInt16BE();
    return {
        result,
        seq
    };
}