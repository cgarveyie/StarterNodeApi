'use strict';

/* global describe, before */

// the app
const app = require('../../src/app');

// testers
const chai = require('chai'); /* eslint-disable-line import/order */
chai.use(require('chai-http')); // middleware for testing server
chai.use(require('chai-things')); // middleware for testing arrays

const { expect } = chai;

// tests
const routes = require('./routes/routes');

const server = `${app.config.host}:${app.config.port}`;

describe('PictureApi System Tester', () => {
  before(() => app.startApp());
  routes(server, chai, expect);
});
