'use strict';

const redis = require('redis');
const Bluebird = require('bluebird');

// make redis connection async
Bluebird.promisifyAll(redis);

const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT || '6379';

/*
 * make client connection to redis
 *
 * @param {Object} logger
 * @returns {Object} client connection
 */
function createClientConnectionWithRedis(logger) {
  return Bluebird.try(() => {
    const client = redis.createClient({
      host,
      port,
      retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
          // End reconnecting on a specific error and flush all commands with
          // a individual error
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          // End reconnecting after a specific timeout and flush all commands
          // with a individual error
          return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
          // End reconnecting with built in error
          return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
      }
    });

    /* eslint-disable no-unused-vars */
    client.monitor((err, res) => {
      if (process.env.NODE_ENV !== 'test') {
        logger.info(`Redis version ${client.server_info.redis_version}: Entering monitoring mode`);
      }
    });

    return client;
  });
}
module.exports = createClientConnectionWithRedis;
