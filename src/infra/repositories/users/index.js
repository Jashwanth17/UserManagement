const { toEntity } = require('./transform');
const { v4: uuidv4 } = require('uuid');

module.exports = ({ model }) => {
  
  const get = async (userId) => {
    try {
      const user = await model.findOne({
        where: { userId },
      });
      if (!user) {
        throw new Error('User not found');
      }
      return toEntity(user.dataValues);
    } catch (error) {
      console.error('Error occurred in get:', error);
      throw error;
    }
  };

  const create = async ({users}) => {
    // const existingUser = await model.findOne({
    //   where: { userName }
    // });
    // if (existingUser) {
    //   throw new Error('User with the same userName already exists');
    // }

    const userData = {
      applicationId:users.applicationId,
      userName:users.userName,
      password:users.password,
    };

    return model
      .create(userData)
      .then((response) => toEntity(response.dataValues));
  };

  const update = async (userId, body) => {
    const updatedData = body;
    updatedData.modifiedBy = 'system'; 

    const existingUser = await model.findOne({
      where: { userName: updatedData.userName }
    });
    if (existingUser && existingUser.userId !== userId) {
      throw new Error('User with the same userName already exists');
    }

    return model
      .update(updatedData, { where: { userId } })
      .then(([result]) => {
        if (result === 0) {
          throw new Error('User ID not found in the database');
        }
        return result;
      });
  };

  const remove = async (userId) => {
    try {
      const deleted = await model.destroy({
        where: { userId }
      });
      if (!deleted) {
        throw new Error('User not found or could not be deleted');
      }
      return deleted;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  return {
    get,
    create,
    update,
    remove
  };
};
