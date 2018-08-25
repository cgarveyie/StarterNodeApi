'use strict';

/* global  describe */

const path = require('path');
const appRoot = require('app-root-path').toString();

// loads .env file
require(path.join(appRoot, 'config'));

// testers
const chai = require('chai'); /* eslint-disable-line import/order */
chai.use(require('chai-http')); // middleware for testing server
chai.use(require('chai-things')); // middleware for testing arrays

const { expect } = chai;

describe('PictureApi Integration Tests', () => {
});
