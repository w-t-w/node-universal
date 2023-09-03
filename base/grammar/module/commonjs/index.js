console.log('来一个 commonjs 模块!');
let {age} = require('./user');
const user = require('./user');
console.log(user);
console.log(age);
user.age = 30;
age = 25;
setTimeout(() => {
    console.log(user);
    console.log(user.age);
    console.log(age);
    user.introduce();
}, 2000);
console.log('已经来了!commonjs 模块!');