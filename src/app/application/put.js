const { ApplicationPut } = require('../../domain/application')

module.exports = ({ applicationRepository }) => {
  // Code for updating an application
  const update = ({ body }) => {
    return new Promise((resolve, reject) => {
      const updateApplication = async () => {
        try {
          const application = ApplicationPut(body)
          await applicationRepository.update(application)
          resolve(application)
        } catch (error) {
          reject(new Error(error.message))
        }
      }
      updateApplication()
    })
  }

  return {
    update
  }
}
