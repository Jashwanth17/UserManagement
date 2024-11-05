const { createContainer, asValue, asFunction } = require('awilix')
// you can do this
const app = require('./app')
const server = require('./interfaces/http/server')
const router = require('./interfaces/http/router')
const config = require('../config')
const logger = require('./infra/logging/logger')
const database = require('./infra/database')
const response = require('./infra/support/response')
const date = require('./infra/support/date')
const repository = require('./infra/repositories')
const symmetric= require('../src/infra/symmetric')
const auth = require('../src/interfaces/http/auth')

const container = createContainer()

// SYSTEM
container
  .register({
    app: asFunction(app).singleton(),
    server: asFunction(server).singleton(),
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton(),
    database: asFunction(database).singleton(),
    response: asFunction(response).singleton(),
    date: asFunction(date).singleton(),
    config: asValue(config),
    repository: asFunction(repository).singleton(),
    symmetric: asFunction(symmetric).singleton(),
    auth: asFunction(auth).singleton()
  })

module.exports = container






