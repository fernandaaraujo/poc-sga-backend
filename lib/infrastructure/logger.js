'use strict';

const ROOT_PATH = process.cwd();

const fmt = require('util').format;
const winston = require('winston');
const config = require(ROOT_PATH + '/lib/infrastructure/config');

const formatter = function(options) {
  let msg = fmt('%s [%s] %s', new Date().toISOString(),
    options.level.toUpperCase(), (options.message || ''));

  if (options.meta && Object.keys(options.meta).length) {
    msg += fmt('\n\t%s', JSON.stringify(options.meta));
  }

  return winston.config.colorize(options.level, msg);
};

let transports = null;
let handlers = null;

const appender = config.get('logging');
if (appender) {
  const stdout = appender.console;
  stdout.formatter = formatter;

  const file = appender.file;
  file.formatter = formatter;

  const handler = appender.exception;
  handler.formatter = formatter;

  transports = [
    new winston.transports.Console(stdout),
    new (require('winston-daily-rotate-file'))(file)
  ];
  handlers = [
    new (require('winston-daily-rotate-file'))(handler)
  ];
} else {
  transports = [
    new winston.transports.Console({
      level: 'debug',
      silent: false,
      colorize: true,
      timestamp: false,
      json: false,
      prettyPrint: true,
      formatter: formatter
    })
  ];
  handlers = [];
}

const logger = new winston.Logger({
  transports: transports,
  exceptionHandlers: handlers,
  exitOnError: false
});

module.exports = logger;
