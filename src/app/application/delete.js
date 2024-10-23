const { ApplicationDelete } = require('../../domain/application')

module.exports = ({ applicationRepository }) => {
  // Code for deleting an application
  const remove = async (applicationId) => {
    try {
      const validatedApplicationId = await ApplicationDelete(applicationId)
      await applicationRepository.delete(validatedApplicationId.applicationId)
      return { message: 'Application deleted successfully' }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    remove
  }
}
