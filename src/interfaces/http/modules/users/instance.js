const container = require('../../../../container') 
const {get, post, put, remove } = require('../../../../app/users')

module.exports = () => {
  const {
    repository: { usersRepository }
  } = container.cradle

  const getUseCase = get({ usersRepository })
  const postUseCase = post({ usersRepository })
  const putUseCase = put({ usersRepository })
  const deleteUseCase = remove({ usersRepository })

  return {
    getUseCase,
    postUseCase,
    putUseCase,
    deleteUseCase,
  }
}