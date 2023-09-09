const net = require('net');

const HOST = '127.0.0.1',
    PORT = 7777;

const socket = new net.Socket({});

socket.connect({
    port: PORT,
    host: HOST,
    keepAlive: true
});

socket.write(Buffer.from('hello nodeJS!'));