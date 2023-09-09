const GeekTime = require('./geek');

const geekTime = new GeekTime();

geekTime.on('lessons', price => {
    if (price <= 80) {
        console.log(`I\'ll buy it~at ${price}$!`);
    } else {
        console.error(`cry!I have no money left!`);
    }
});