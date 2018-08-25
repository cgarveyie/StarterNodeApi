# PictureApi
Picture API

### Things to Note

- You need a .env file.  Included in the project is TEMPLATE.env, which has all the variables you need.  .gitignore is already set to ignore .env files.
- .gitattribute sets .js and .json line endings to LF and .sln line endings to CRLF on checkout.

## Prerequisites

- [Node version>=8.0.0](https://nodejs.org/en/)
- [Redis version>=3.2.100](https://redis.io/)

## Installing

The easiest way to get started is to clone the repository:

```sh
# Get the latest snapshot with https
git clone https://github.com/jtdarkly/PictureApi.git
# or ssh
git clone git@github.com:jtdarkly/PictureApi.git

# Change directory
cd PictureAPI/PictureAPI

# Install NPM dependencies
npm install
```
You will need to create an .env file in the project directory.
```dosini
NODE_ENV=yourvalue
HOST=yourvalue
PORT=yourvalue
PUBLIC_BASE_URL=yourvalue

DB_HOST=yourvalue
DB_PORT=yourvalue
```
Within app, defaults are set to:
```dosini
NODE_ENV=development
HOST=http://localhost
PORT=1337
PUBLIC_BASE_URL=http://localhost:1337

DB_HOST=127.0.0.1
DB_PORT=6379
```

## Usage

```sh

# Start the API server using node
npm start

# Start in development mode
npm run dev

# Test it*
npm test
# or
npm run test:all

# Just integration test*
npm run test:integration

# Just unit test*
npm run test:unit

# Just system test*
npm run test:system

```
* When run, NODE_ENV is always set to 'test'.

## API Information

- Swagger doc can be found in [PictureApi/src/public](https://github.com/jtdarkly/PictureApi/blob/master/PictureApi/public/swagger.yaml) or URI *host*/static/swagger.yaml
- Swagger UI can be found at URI *host*/api-docs

## Dependencies
- [app-root-path](https://www.npmjs.com/package/app-root-path)
- [bluebird](https://www.npmjs.com/package/bluebird)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [chai](https://www.npmjs.com/package/chai)
- [chai-http](https://www.npmjs.com/package/chai-http)
- [chai-things](https://www.npmjs.com/package/chai-things)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [cross-env](https://www.npmjs.com/package/cross-env)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [express-session](https://www.npmjs.com/package/express-session)
- [formidable](https://www.npmjs.com/package/formidable)
- [helmet](https://www.npmjs.com/package/helmet)
- [lodash](https://www.npmjs.com/package/lodash)
- [mocha](https://www.npmjs.com/package/mocha)
- [morgan](https://www.npmjs.com/package/morgan)
- [redis](https://www.npmjs.com/package/redis)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- [winston](https://www.npmjs.com/package/winston)
- [yamljs](https://www.npmjs.com/package/yamljs)
### Dev

- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)
- [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
- [eslint-plugin-mocha](https://www.npmjs.com/package/eslint-plugin-mocha)
- [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node)
- [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise)
- [eslint-plugin-standard](https://www.npmjs.com/package/eslint-plugin-standard)
- [jsdoc](https://www.npmjs.com/package/jsdoc)
- [nodemon](https://www.npmjs.com/package/nodemon)
