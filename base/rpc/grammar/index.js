const fs = require('fs');
const path = require('path');
const protobuf = require('protocol-buffers');

const PROTO_DIR = path.resolve(__dirname, './proto/data.proto');

const {User} = protobuf(fs.readFileSync(PROTO_DIR, 'utf-8'));

const buffer1 = Buffer.from('hello geekBang');
const buffer2 = Buffer.from([1, 2, 3, 4]);
const buffer3 = Buffer.alloc(4);

console.log(buffer1, buffer2, buffer3);

buffer3.writeInt32LE(512);

console.log(buffer3);

buffer3.writeInt32BE(512);

console.log(buffer3);

const user = {
    name: 'wtw',
    age: 29,
    gender: true,
    hobby: {
        sports: 'basketball'
    }
}
const user_buffer = User.encode(user);
console.log(user_buffer);
console.log(User.decode(user_buffer));