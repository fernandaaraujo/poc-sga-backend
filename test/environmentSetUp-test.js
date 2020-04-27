'use strict';

const fs = require("fs");

const ROOT_PATH = process.cwd();

const config = require(ROOT_PATH + '/lib/infrastructure/config');

config.set('logging:console:silent', true);

const cleanDb = () => {
    try {
        fs.unlinkSync(ROOT_PATH + "/.json");
    } catch (err) {
        // silence is golden ..
        //ignore error that occur cause the file does not exist
    }
}

afterEach(() => {
    cleanDb();
});
