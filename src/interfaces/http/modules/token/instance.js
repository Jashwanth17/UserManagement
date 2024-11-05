const container = require('../../../../container') // we have to get the DI
const { post } = require('../../../../../src/app/token')

module.exports = () => {
  const {
    repository: { usersRepository },
    symmetric
  } = container.cradle

  const postUseCase = post({
    usersRepository,
    webToken: symmetric
  })

  return {
    postUseCase
  }
}
