'use strict';

require('dotenv').config(); // This module makes getting the .env easy

const env = process.env.NODE_ENV || 'development';
const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 1337;
const baseUrl = `${host}:${port}`;
const publicBaseUrl = process.env.PUBLIC_BASE_URL || `${host}:${port}`;

const config = {
  env,
  host,
  port,
  baseUrl,
  publicBaseUrl,
};

module.exports = config;
