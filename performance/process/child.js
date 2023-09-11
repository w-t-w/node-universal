process.on('message', (msg) => {
    console.log(`process: ${msg}`);
    process.send('hello,process,I\'m child_process!');
});