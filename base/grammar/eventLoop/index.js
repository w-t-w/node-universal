const eventLoop = {
    loop: [],
    init() {
        setInterval(() => {
            while (this.loop.length) {
                const listener = this.loop.shift();
                listener();
            }
        }, 1000);
    },
    add(listener) {
        this.loop.push(listener);
    }
};
eventLoop.init();
eventLoop.add(() => {
    console.log('hello geekBang!');
});
setTimeout(() => {
    eventLoop.add(() => {
        console.log('hello Tencent!');
    });
}, 10000);
