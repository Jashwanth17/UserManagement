const { usersDelete } = require('../../../src/domain/users');

/**
 * Function for deleting a user.
 */
module.exports = ({ usersRepository }) => {

  // Code for deleting an application
  const remove = async (applicationId) => {
    try {
      const validatedid = await usersDelete(applicationId)
      await usersRepository.remove(validatedid.id)
      return { message: 'Users deleted successfully' }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    remove
  }
}
