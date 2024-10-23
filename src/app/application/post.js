/**
 * This file will hold all the create use-case for the application domain.
 */
const { ApplicationPost } = require('../../domain/application')

/**
 * Function for creating an application.
 */
module.exports = ({ applicationRepository }) => {
  // Code for creating an application
  const create = ({ body }) => {
    return Promise.resolve()
      .then(() => {
        const application = ApplicationPost(body)
        return applicationRepository.create(application)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return {
    create
  }
}
