const user = require('./cjs');

console.log(user.age);

const {age} = require('./cjs');

console.log(age);

setTimeout(() => {
    console.log(user);
    user.age = 20;
    console.log(age);
}, 1000);

setTimeout(() => {
    console.log(user);
    console.log(age);
}, 3000);