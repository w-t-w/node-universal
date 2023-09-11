// 主进程
const cp = require('child_process');
const path = require('path');

const child_process = cp.fork(path.resolve(__dirname, './child.js'));

child_process.send('hello,child_process,I\'m process!');
child_process.on('message', (msg) => {
    console.log(`child process: ${msg}`);
});

