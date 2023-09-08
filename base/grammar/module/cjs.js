exports.username = '比木白';
exports.age = 29;
exports.hobby = {
    sports: 'basketball'
};
setTimeout(() => {
    console.log(exports);
    console.log(exports.age);
    exports.age = 30;
    console.log(module.exports);
    module.exports.age = 26;
}, 2000);

module.exports = {
    username: 'wtw',
    age: 18,
    hobby: {
        sports: 'football'
    }
};