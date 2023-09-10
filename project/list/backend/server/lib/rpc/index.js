const net = require('net');

class RPC {
    constructor({encode, decode, isReceiveComplete}) {
        this.encode = encode;
        this.decode = decode;
        this.isReceiveComplete = isReceiveComplete;
    }

    createServer(callback) {
        const tcpServer = net.createServer(socket => {
            let buffer = null,
                package_request = null,
                package_length = null;
            socket.on('data', data => {
                buffer = buffer && buffer.length > 0 ? Buffer.concat([buffer, data]) : data;
                while (buffer && (package_length = this.isReceiveComplete(buffer))) {
                    if (buffer.length === package_length) {
                        package_request = buffer;
                        buffer = null;
                    } else {
                        package_request = buffer.slice(0, package_length);
                        buffer = buffer.slice(package_length);
                    }

                    const {seq, result} = this.decode(package_request);

                    callback({
                        body: result,
                        socket
                    }, {
                        end: (data) => {
                            const buffer_response = this.encode(data, seq);
                            socket.write(buffer_response);
                        }
                    });
                }
            });
        });

        return {
            listen(...args) {
                tcpServer.listen.apply(tcpServer, args);
            }
        }
    }
}

module.exports = RPC;