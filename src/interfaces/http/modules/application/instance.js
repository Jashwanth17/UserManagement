const container = require('../../../../../src/container') 
const {
  get,
  post,
  put,
  remove
  
} = require('../../../../../src/app/application')

module.exports = () => {
  const {
    repository: { applicationRepository }
  } = container.cradle

  const getUseCase = get({ applicationRepository })
  const postUseCase = post({ applicationRepository })
  const putUseCase = put({ applicationRepository })
  const deleteUseCase = remove({ applicationRepository })

  return {
    getUseCase,
    postUseCase,
    putUseCase,
    deleteUseCase
  }
}