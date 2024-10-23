const { usersPut } = require('../../../src/domain/users');

/**
 * Function for updating a user.
 */
module.exports = ({ usersRepository }) => {
  // Code for updating a user
  const update = ({ id,body }) => {
    return new Promise((resolve, reject) => {
      const updateUser = async () => {
        try {
          // Create the updated user object using the provided body
          const user = usersPut({ id,body });
          await usersRepository.update({id,body});
          resolve({id,body});
        } catch (error) {
          reject(new Error(error.message));
        }
      };
      updateUser();
    });
  };

  return {
    update 
  };
};
