const net = require('net');

const PORT = 7777;

const server = net.createServer(socket => {
    socket.on('data', buffer => {
        const result = buffer.toString();
        console.log(result);
        socket.write(Buffer.from(`${result}!Hi I'm Gary!`));
    });
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}`);
});