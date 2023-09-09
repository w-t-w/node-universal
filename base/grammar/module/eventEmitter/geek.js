const EventEmitter = require('events').EventEmitter;

class GeekTime extends EventEmitter {
    constructor() {
        super();
        setInterval(() => {
            this.emit('lessons', Math.floor(Math.random() * 100));
        }, 500);
    }
}

module.exports = GeekTime;