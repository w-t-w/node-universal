const EventEmitter = require('events').EventEmitter;

class GeekBang extends EventEmitter {
    constructor(props) {
        super(props);
        setInterval(() => {
            this.emit('onShelf', Math.random() * 100);
        }, 300);
    }
}

module.exports = GeekBang;