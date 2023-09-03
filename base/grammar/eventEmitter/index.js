const GeekBang = require('./store');
const geekBangShelf = new GeekBang();

function store(callback) {
    geekBangShelf.on('onShelf', price => {
        if (price < 80) {
            callback(null, {name: '极客时间课程', price});
        } else {
            const error = new Error('Too expensive!');
            callback(error);
        }
    });
}

try {
    store(function (err, result) {
        if (err) return console.error(err.message);
        console.log(`buy ${result.name}! $${result.price}!`);
    });
} catch (e) {
    console.log(e.message);
}

