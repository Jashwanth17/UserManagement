const container = require('../../../../../src/container') // we have to get the DI
const { get, post, put, remove} = require('../../../../../src/app/wallet')

module.exports = () => {
  const {
    repository: { walletRepository }
  } = container.cradle

  const getUseCase = get({ walletRepository })

  const postUseCase = post({walletRepository})

  const putUseCase = put({ walletRepository })

  const deleteUseCase = remove({ walletRepository })

  return {
    getUseCase,
    postUseCase,
    putUseCase,
    deleteUseCase
  }
}