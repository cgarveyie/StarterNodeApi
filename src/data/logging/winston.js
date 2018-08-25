'use strict';

const appRoot = require('app-root-path');
const winston = require('winston');

const options = {
  error: {
    level: 'error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  combined: {
    level: 'info',
    filename: `${appRoot}/logs/combined.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
  },
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.File(options.error),
    new winston.transports.File(options.combined),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

/* eslint-disable no-unused-vars */
// for getting morgan stuff
logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};
/* eslint-enable no-unused-vars */

module.exports = logger;
