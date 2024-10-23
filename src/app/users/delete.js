const { usersDelete } = require('../../../src/domain/users');

/**
 * Function for deleting a user.
 */
module.exports = ({ usersRepository }) => {
  // Code for removing a user
  const remove = (userId) => {
    return new Promise((resolve, reject) => {
      const deleteUser = async () => {
        try {
          
          const deletedUser = await usersRepository.delete(userId);
          resolve(deletedUser);
        } catch (error) {
          reject(new Error(error.message));
        }
      };
      deleteUser();
    });
  };

  return {
    remove // Expose the remove function
  };
};
