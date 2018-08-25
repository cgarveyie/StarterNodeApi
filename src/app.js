'use strict';

// bluebird promises
const Bluebird = require('bluebird');

// load logger
const logger = require('./data/logging/winston');
// load configuration
const config = require('../config');
// check for needed config files
module.exports.config = config;

/*
 * Load Logic
 * */

/*
 * Load Data
 * */
// redis client connection
const clientConnectionRedis = require('./data/redis/clientConnectionRedis');

/*
 * Load Presentation
 * */
// load express router
const router = require('./presentation/http/router')(config, logger);

// start the app
function startApp() {
  Bluebird.props({
    dbConnection: clientConnectionRedis(logger),
  })
    .then((result) => {
      /* eslint-disable global-require */

      // load the express server
      return require('./presentation/http/httpExpressServer')(config, router, logger);
    })
    .catch((err) => {
      if (config.env !== 'test') {
        logger.error(err);
      }
      return err;
    });
}
module.exports.startApp = startApp;
