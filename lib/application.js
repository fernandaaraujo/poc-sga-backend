'use strict';

const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const ROOT_PATH = process.cwd();
const logger = require(ROOT_PATH + '/lib/infrastructure/logger');
const source = require(ROOT_PATH + '/lib/interface');

const app = express();

app.use(parser.json());

app.use(morgan(':method :url :reqbody - :status', {
  stream: {
    write: logger.info
  }
}));

app.use(cors());

morgan.token('reqbody', function(req) {

  global.TOTAL_REQUESTS = ++global.TOTAL_REQUESTS;

  return JSON.stringify(req.body);
});

app.use(source.router);

module.exports = app;