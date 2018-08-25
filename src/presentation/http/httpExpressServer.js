'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();

const Bluebird = require('bluebird');
const express = require('express');
const helmet = require('helmet');

// options for helmet - security for express
const staticOptions = {
  dotfiles: 'ignore',
  extensions: ['yaml'],
  etag: false,
  maxAge: '1d',
  redirect: false,
};

function startHttpExpressServer(config, router, logger) {
  // create http server app
  const app = express();

  app.use(helmet())
    .use(helmet.referrerPolicy({ policy: 'same-origin' }))
    .use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
      },
    }))
    .use('/static', express.static(path.join(appRoot, 'public'), staticOptions))
    .use(router);

  return new Bluebird((resolve) => {
    const http = app
      .listen(config.port, () => {
        const { port } = http.address();
        if (config.env !== 'test') {
          logger.info(`Picture API [p ${process.pid}] listening on port ${port}`);
        }
        resolve();
      });
  });
}
module.exports = startHttpExpressServer;
