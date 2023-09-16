const RPC = require('./rpc');

const package_header_length = 8,
    seq_length = 4;

const rpc = (encodeSchema, decodeSchema) => {
    return new RPC({
        encode(data, seq) {
            const body = encodeSchema.encode(data);
            const body_length = body.length;
            const header = Buffer.alloc(package_header_length);
            header.writeInt32BE(seq);
            header.writeInt32BE(body_length, seq_length);
            return Buffer.concat([header, body]);
        },
        decode(buffer) {
            const seq = buffer.readInt32BE();
            const body = buffer.slice(package_header_length);
            const result = decodeSchema.decode(body);
            return {
                seq,
                result
            };
        },
        isReceiveComplete(buffer) {
            if (buffer.length <= package_header_length)
                return 0;
            const body_length = buffer.readInt32BE(seq_length);
            if (buffer.length >= package_header_length + body_length)
                return package_header_length + body_length;
            else
                return 0;
        }
    });
}

module.exports = {
    rpc
};