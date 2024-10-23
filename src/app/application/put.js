const { ApplicationPut } = require('../../domain/application')

module.exports = ({ applicationRepository }) => {
  // Code for updating an application
  const update = ({ id,body }) => {
    return new Promise((resolve, reject) => {
      const updateApplication = async () => {
        try {
          // const application = ApplicationPut(body)
          await applicationRepository.update({id,body})
          resolve({id,body})
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
