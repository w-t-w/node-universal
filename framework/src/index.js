const fs = require('fs');
const path = require('path');

const run = require('./run');

const TEMPLATE_DIR = path.resolve(process.cwd(), './framework/config/play/framework_template.tpl');

const PORT = 7777;

(async () => {
    const data_config = require('../config/play/framework_config');

    const content = await new Promise((resolve, reject) => {
        fs.readFile(TEMPLATE_DIR, 'utf-8', (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });

    const client = run({
        '/play': {
            data_config,
            template_config: {
                path: TEMPLATE_DIR,
                content
            }
        }
    });
    client.listen(PORT, () => {
        console.log(`The client page is running at http://localhost:${PORT}!`);
    });
})();