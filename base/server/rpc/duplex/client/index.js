const net = require('net');

const HOST = '127.0.0.1',
    PORT = 7777;

const packageLength = 4,
    packageHeaderLength = 6,
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
    seq = 0,
    buffer = null,
    package_length = null,
    package_request = null;

socket.on('data', data => {
    buffer = buffer && buffer.length ? Buffer.concat([buffer, data]) : data;
    while (buffer && (package_length = isReceiveComplete(buffer))) {
        if (buffer.length === package_length) {
            package_request = buffer;
            buffer = null;
        } else {
            package_request = buffer.slice(0, package_length);
            buffer = buffer.slice(package_length);
        }
        const {seq, result} = decode(package_request);
        console.log(`包头为 ${seq + 1} 的包,课程为 ${result}`);
    }
});

for (let k = 0; k < 100; k++) {
    index = Math.floor(Math.random() * lessonIds_length);
    id = lessonIds[index];
    socket.write(encode(id));
}

function encode(id) {
    const body = Buffer.alloc(packageLength);
    const bodyLength = body.length;
    body.writeInt32BE(id);
    const header = Buffer.alloc(packageHeaderLength);
    console.log(`包头为 ${seq + 1} 的包,课程 id 为 ${id}`);
    header.writeInt16BE(seq++);
    header.writeInt32BE(bodyLength, seqLength);
    return Buffer.concat([header, body]);
}

function decode(buffer) {
    const body = buffer.slice(packageHeaderLength);
    const result = body.toString();
    const seq = buffer.readInt16BE();
    return {
        result,
        seq
    };
}

function isReceiveComplete(buffer) {
    if (buffer.length <= packageHeaderLength)
        return 0;
    const bodyLength = buffer.readInt32BE(seqLength);
    if (buffer.length >= bodyLength + packageHeaderLength)
        return bodyLength + packageHeaderLength;
    else
        return 0;
}