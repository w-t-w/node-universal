// const vm = require('vm');
// const user = {
//     name: 'wtw',
//     age: 29
// };
// console.log(`I'm ${user.name}, ${user.age} year's old!`);
// const result = vm.runInNewContext('`I\'m ${user.name}, ${user.age} year\'s old!`', {user});
// console.log(result);
const vm = require('vm');
const user = {
    name: 'wtw yin',
    age: 25
};
const context = vm.createContext({
    user,
    _(value) {
        if (!value) return '';
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;');
    },
    include(name) {
        return template[name]();
    }
});
const template = {
    templateA: '<section>${include("templateB")}</section>',
    templateB: '<p>I\'m ${user.name}, ${user.age} year\'s old!</p>'
};
Object.entries(template).forEach(([key, value]) => {
    template[key] = vm.runInNewContext(`(function () {
        return \`${value}\`;
    })`, context);
});
const result = template['templateA']();
console.log(result);
