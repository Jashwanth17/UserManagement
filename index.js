const container = require('./src/container')
const app = container.resolve('app')

app.start().catch((error) => {
  if (app.logger && app.logger.error) {
    app.logger.error(error.stack)
  } else {
    console.error('Error occurred during startup:', error)
  }
  process.exit()
})

