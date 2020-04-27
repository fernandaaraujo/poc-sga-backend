'use strict';

const ROOT_PATH = process.cwd();
const nconf = require('nconf');

nconf.argv()
.env()
.file('config', {
  file: ROOT_PATH + '/conf/config.json'
});

module.exports = nconf;
