const eventLoop = {
    loop: [],
    run() {
        while (this.loop.length) {
            const callback = this.loop.shift();
            callback();
        }
        setTimeout(this.run.bind(this), 500);
    },
    add(callback) {
        this.loop.push(callback);
    }
};
eventLoop.run();
eventLoop.add(() => {
    console.log('right now!');
});
setTimeout(() => {
    eventLoop.add(() => {
        console.log('1 second after!');
    });
}, 1000);
setTimeout(() => {
    eventLoop.add(() => {
        console.log('2 second after!');
    });
}, 2000);