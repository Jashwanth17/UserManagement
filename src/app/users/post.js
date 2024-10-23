/**
 * This file will hold all the create use-case for the application domain.
 */
const { usersPost } = require('../../domain/users')

/**
 * Function for creating an application.
 */
module.exports = ({ usersRepository }) => {
  // Code for creating an application
  const create = ({ body }) => {
    return Promise.resolve()
      .then(() => {
        const users = usersPost(body)
        return usersRepository.create({users})
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return {
    create
  }
}
