const { usersGet } = require('../../../src/domain/users');

module.exports = ({ usersRepository }) => {
  // Function to get user details by userId
  const get = async (userId) => {
    try {
      // Validate the userId and retrieve user details
      // const validatedUserId = await usersGet({ userId });
      const user = await usersRepository.get(userId);

      // Extract relevant user information
      const extractedUser = {
        id: user.id,
        userId: user.userId,
        userName: user.userName
      };

      return extractedUser;
    } catch (error) {
      console.error('Error occurred in get:', error);
      throw error; 
    }
  };

  return {
    get // Expose the get function
  };
};
