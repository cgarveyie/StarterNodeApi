'use strict';

const { Router } = require('express');

// middleware
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const session = require('express-session')({
  secret: 'catsonkeyboards',
  saveUninitialized: false,
  resave: false,
});

// swagger doc
const swaggerDocument = YAML.load('./public/swagger.yaml'); // root

/**
 * for politeness
 * @module hello
 * @param {Object} req
 * @param {Object} res
 */
function hello(config) {
  return (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.status(200).send(`StarterNodeApi is listening on ${config.publicBaseUrl}/api/v1.0`);
  };
}

function requestLogger(logger) {
  return morgan('combined', { stream: logger.stream });
}

/*
 * @module onlyTheseMethods
 * 405 response for not allowed response methods
 * @param {string} methods not allowed
 * @returns {Response} res
 * */
function onlyTheseMethods(methods) {
  return function onlyTheseMethodResponses(req, res) {
    res.set({
      Allow: methods,
    });
    return res.status(405).end();
  };
}

/* eslint-disable no-unused-vars, arrow-body-style */

/**
 * four variable (err, req, res, next) is required for express error handlers
 * even if they are unused
 * stacktrace for dev
 * @param {logger} logger
 * */
function devErrorHandler(logger) {
  return ((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${res.get('Status')} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res
      .type('json')
      .status(err.status || 500)
      .send({
        error: {
          message: err.message,
          error: err,
        },
      });
  });
}

/**
 * four variable (err, req, res, next) is required for express error handlers
 * even if they are unused
 * no stacktrace for prod
 * @param {logger} logger
 * */
function errorHandler(logger) {
  return ((err, req, res, nex) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res
      .type('json')
      .status(err.status || 500)
      .send({
        error: {
          message: err.message,
          error: {},
        },
      });
  });
}

/**
 * four variable (req, res, next) is required for express middleware
 * even if they are unused
 * */
function notFound(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
}


function createExpressRouter(config, logger) {
  const router = Router();

  if (config.env === 'development') {
    router.use(requestLogger(logger));
  }

  // express limits request size to 100kb by default
  router
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(bodyParser.json()) // middleware for parsing json
    .use(bodyParser.urlencoded({ extended: true })) // form data
    .use(cookieParser())
    .use(session);

  router.route('/')
    .get(hello(config))
    .all(onlyTheseMethods('GET'));

  router.route('/api/v1.0')
    .get(hello(config))
    .all(onlyTheseMethods('GET'));

  // 404 routes
  router.use(notFound);

  // dev error handler
  if (config.env === 'development') {
    router.use(devErrorHandler(logger));
  }

  // production error handler
  router.use(errorHandler(logger));

  return router;
}
module.exports = createExpressRouter;
