const vm = require('vm');
const fs = require('fs');

const templateCache = {};

const templateContext = vm.createContext({
    _(val) {
        if (!val) return '';
        return val.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;');
    },
    include(name, content, data) {
        if (typeof data !== 'undefined') {
            data = content;
            content = undefined;
        }
        const template = templateCache[name] || createTemplate(name, content);
        return template(data);
    }
});

function createTemplate(name, content) {
    templateCache[name] = vm.runInNewContext(`(function (data) {
        with(data) {
            return \`${typeof content === 'undefined' ? fs.readFileSync(name, 'utf-8') : content}\`;
        }
    })`, templateContext);

    return templateCache[name];
}

module.exports = createTemplate;