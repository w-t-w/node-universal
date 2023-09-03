exports.name = 'wtw';
exports.age = 29;
exports.hobby = {
    sports: 'basketball'
};
setTimeout(() => {
    console.log(exports);
    console.log(exports.age);
    exports.age = 28;
    exports.introduce = function () {
        console.log(`hello,My name is ${this.name},${this.age} year's old,I love ${this.hobby.sports}!`);
    };
    module.exports.introduce = function () {
        console.log(`hello,My name is ${this.name},${this.age} year's old,I love ${this.hobby.sports}!`);
    };
    console.log(module.exports);
    console.log(module.exports.age);
}, 1000);

module.exports = {
    name: '比木白',
    age: 18,
    hobby: {
        sports: 'football'
    }
};