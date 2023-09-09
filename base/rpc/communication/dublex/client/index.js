const net = require('net');

const PORT = 7777,
    HOST = '127.0.0.1';

const package_header_length = 6,
    seq_length = 2,
    package_length = 4;

let buffer = null,
    index = null,
    package_request = null,
    package_receive_length = null,
    seq = 0,
    id = null;

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
    port: PORT,
    host: HOST,
    keepAlive: true
});

socket.on('data', data => {
    buffer = buffer && buffer.length > 0 ? Buffer.concat([buffer, data]) : data;
    while (buffer && (package_receive_length = isReceiveComplete(buffer))) {
        if (buffer.length === package_receive_length) {
            package_request = buffer;
            buffer = null;
        } else {
            package_request = buffer.slice(0, package_receive_length);
            buffer = buffer.slice(package_receive_length);
        }

        const {seq, result} = decode(package_request);
        console.log(`包头为 ${seq} 的包课程为 ${result}!`);
    }
});

for (let i = 0; i < 100; i++) {
    index = Math.floor(Math.random() * lesson_id.length);
    id = lesson_id[index];
    socket.write(encode(id, seq++));
}

function isReceiveComplete(buffer) {
    if (buffer.length <= package_header_length)
        return 0;
    const body_length = buffer.readInt32BE(seq_length);
    if (buffer.length >= package_header_length + body_length)
        return package_header_length + body_length;
    else
        return 0;
}

function encode(data, seq) {
    const body = Buffer.alloc(package_length);
    body.writeInt32BE(data);
    const body_length = body.length;
    const header = Buffer.alloc(package_header_length);
    header.writeInt16BE(seq);
    header.writeInt32BE(body_length, seq_length);
    console.log(`包头为 ${seq} 的包课程 id 为 ${data}!`);
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