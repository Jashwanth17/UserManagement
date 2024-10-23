const { ApplicationDelete } = require('../../domain/application')

module.exports = ({ applicationRepository }) => {
  // Code for deleting an application
  const remove = async (applicationId) => {
    try {
      const validatedid = await ApplicationDelete(applicationId)
      await applicationRepository.remove(validatedid.id)
      return { message: 'Application deleted successfully' }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    remove
  }
}
