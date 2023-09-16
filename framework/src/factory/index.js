const fs = require('fs');
const path = require('path');

const REQUESTER_DIR = path.resolve(__dirname, '../requesters');

const requesterCache = {};

function factory(config) {
    const default_callback = data => data,
        default_catch = error => error;
    const before = config.before || default_callback,
        then = config.then || default_callback,
        catch_callback = config.catch || default_catch;

    const requester = requesterCache[config.protocol];
    requester.compile(config);

    return async function (data) {
        try {
            data = before(data);
        } catch (e) {
            catch_callback(e);
            return Promise.resolve(null);
        }

        return {
            result: await requester
                .request(data)
                .then(then)
                .catch(catch_callback)
        };
    }
}

factory.createRequester = function (name, requester) {
    if (typeof requesterCache[name] !== 'undefined')
        return true;
    if (typeof requester !== 'undefined')
        requesterCache[name] = requester;
    else {
        const PUBLIC_REQUESTER_DIR = path.resolve(REQUESTER_DIR, name);
        if (fs.existsSync(PUBLIC_REQUESTER_DIR))
            requesterCache[name] = require(PUBLIC_REQUESTER_DIR);
    }
}

module.exports = factory;