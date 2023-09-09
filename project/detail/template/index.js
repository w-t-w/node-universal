const vm = require('vm');
const fs = require('fs');

const template_cache = {};

const template_context = vm.createContext({
    _(value) {
        if (!value) return '';
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;');
    },
    include(name, data) {
        const template = template_cache[name] || createTemplate(name);
        return template(data);
    }
});

function createTemplate(name) {
    template_cache[name] = vm.runInNewContext(`(function (data) {
        with(data) {
            return \`${fs.readFileSync(name, 'utf-8')}\`
        }
    })`, template_context);
    return template_cache[name];
}

module.exports = createTemplate;