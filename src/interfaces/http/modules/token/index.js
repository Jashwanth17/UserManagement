const container = require('../../../../container')
const router = require('./router')
const instance = require('./instance')

module.exports = () => {
  const { logger, response: { Success, Fail }, symmetric } = container.cradle
  const app = instance()

  return {
    app,
    router: router({ logger, symmetric, response: { Success, Fail }, ...app })
  }
}
