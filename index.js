'use strict';

process.title = require('./package.json').name;

const config = require('./lib/infrastructure/config');

config.file('./conf/config.json');

const logger = require('./lib/infrastructure/logger');
const app = require('./lib/application');

const shutdown = () => {
  logger.warn('Server receive signal to shutdown.');
  process.exit(0);
};

process.on('SIGTERM', shutdown)
  .on('SIGINT', shutdown)
  .on('SIGHUP', shutdown)
  .on('uncaughtException', (er) => {
    logger.error(er.message);
  })
  .on('exit', function(code) {
    logger.info('Node process exit with code:', code);
  });

function initializeRequestsCounter() {
  global.TOTAL_REQUESTS = 1;
}

const server = app.listen(process.env.PORT || 3001);

// const server = app.listen(config.get('server:port'), (err) => {
//   if (err) {
//     logger.error('Error on listen port. ', err.message);
//   }
//   initializeRequestsCounter();

//   logger.info('Server starting at %s:%s.',
//     server.address().address, server.address().port);

//   server.on('close', function() {
//     logger.info('Shutdown the application server');
//   });
// });

module.exports = server;
