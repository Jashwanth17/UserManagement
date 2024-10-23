const { ApplicationGet } = require('../../domain/application')

module.exports = ({ applicationRepository }) => {
  const get = async (applicationId) => {
    try {
      const validatedApplicationId = await ApplicationGet({ applicationId })
      const application = await applicationRepository.get(
        validatedApplicationId.applicationId,
      )
      return application
    } catch (error) {
      console.error('Error occurred in get:', error)
      throw error
    }
  }

  return {
    get
  }
}
