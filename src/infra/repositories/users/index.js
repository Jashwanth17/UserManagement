// const { toEntity } = require('./transform');
// const { v4: uuidv4 } = require('uuid');

// module.exports = ({ model }) => {
  
//   const get = async (id) => {
//     try {
//       const user = await model.findOne({
//         where: { id },
//       });
//       if (!user) {
//         throw new Error('User not found');
//       }
//       return toEntity(user.dataValues);
//     } catch (error) {
//       console.error('Error occurred in get:', error);
//       throw error;
//     }
//   };

//   const create = async ({users}) => {
//     // const existingUser = await model.findOne({
//     //   where: { userName }
//     // });
//     // if (existingUser) {
//     //   throw new Error('User with the same userName already exists');
//     // }

//     const userData = {
//       applicationId:users.applicationId,
//       userName:users.userName,
//       password:users.password,
//     };

//     return model
//       .create(userData)
//       .then((response) => toEntity(response.dataValues));
//   };

//   const update = async ({id, body}) => {
//     const updatedData = {
//       userName:body.userName,
//       password: body.passoword
      
//     };
    
//     console.log(updatedData);
//     return model
//       .update(updatedData, {
//         where:  { id },
//         returning: true,
//       })
//       .then((result) => {
//         if (result[0] === 0) {
//           throw new Error('User ID not found in the database');
//         }
//         return result[1][0]; // Returning the updated entity
//       })
//       .catch((error) => {
//         console.error('Error occurred in update:', error);
//         throw error;
//       });
//   };

//   const remove = async (id) => {
//     try {
//       const deleted = await model.destroy({
//         where: { id }
//       });
//       if (!deleted) {
//         throw new Error('User not found or could not be deleted');
//       }
//       return { success: true, message: 'Users deleted successfully' };
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       throw error;
//     }
//   };

//   return {
//     get,
//     create,
//     update,
//     remove
//   };
// };



const { toEntity } = require('./transform');

module.exports = ({ model }) => {
  
  const get = async (id) => {
    try {
      const user = await model.findOne({
        where: { id },
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

  const create = async ({ users }) => {
    const userData = {
      applicationId: users.applicationId,
      userName: users.userName,
      password: users.password,
    };

    return model
      .create(userData)
      .then((response) => toEntity(response.dataValues))
      .catch((error) => {
        console.error('Error occurred in create:', error);
        throw error;
      });
  };

  const update = async ({ id, body }) => {
    const updatedData = {
      userName: body.userName,
      password: body.password,  // Fixed typo from passoword to password
    };
    
    console.log(updatedData);
    return model
      .update(updatedData, {
        where: { id },
        returning: true,
      })
      .then((result) => {
        if (result[0] === 0) {
          throw new Error('User ID not found in the database');
        }
        return result[1][0]; // Returning the updated entity
      })
      .catch((error) => {
        console.error('Error occurred in update:', error);
        throw error;
      });
  };

  const remove = async (id) => {
    try {
      const deleted = await model.destroy({
        where: { id }
      });
      if (!deleted) {
        throw new Error('User not found or could not be deleted');
      }
      return { success: true, message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  // New method to find user by token payload
  const findByDetails = async (userId, applicationId) => {
    try {
      const user = await model.findOne({
        where: { id: userId, applicationId: applicationId },
      });
      if (!user) {
        throw new Error('User not found with the given details');
      }
      return toEntity(user.dataValues);
    } catch (error) {
      console.error('Error occurred in findByDetails:', error);
      throw error;
    }
  };

  // Add findOne method

  const findOne= async (userId, applicationId) => {
    try {
      const user = await model.findOne({
        where: { id: userId, applicationId: applicationId },
      });
      if (!user) {
        throw new Error('Token Generated');
      }
      return toEntity(user.dataValues);
    } catch (error) {
      console.error('Error occurred in findOne:', error);
      throw error;
    }
  };


  return {
    get,
    create,
    update,
    remove,
    findByDetails,
    findOne
  };
};
