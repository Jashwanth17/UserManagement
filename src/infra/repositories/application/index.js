const { v4: uuidv4 } = require('uuid');
const { toEntity } = require('./transform');
const auth = require('../../../interfaces/http/auth');

module.exports = ({ model }) => {
  // Fetch application by applicationId
  const get = async (id, token) => {
    try {
      await auth.verifyToken(token); // Verify token before proceeding
      const application = await model.findByPk(id, {});
      if (!application) {
        throw new Error('Application not found');
      }
      return toEntity(application);
    } catch (error) {
      console.error('Error occurred in get:', error);
      throw error;
    }
  };

  // Create a new application
  const create = async (applicationData) => {
    try {
      const newApplicationData = {
        applicationName: applicationData.applicationName,
        description: applicationData.description,
      };

      const response = await model.create(newApplicationData);
      return toEntity(response);
    } catch (error) {
      console.error('Error occurred in create:', error);
      throw error;
    }
  };

  // Update an existing application
  const update = async ({ id, body }, token) => {
    try {
      await auth.verifyToken(token); 
      const updatedData = {
        applicationName: body.applicationName,
        description: body.description,
      };

      console.log(updatedData);
      const result = await model.update(updatedData, {
        where: { id },
        returning: true,
      });

      if (result[0] === 0) {
        throw new Error('Application ID not found in the database');
      }
      return result[1][0]; 
    } catch (error) {
      console.error('Error occurred in update:', error);
      throw error;
    }
  };

  // Delete an application by applicationId
  const remove = async (id, token) => {
    try {
      await auth.verifyToken(token); // Verify token before proceeding
      const deleted = await model.destroy({
        where: { id },
      });
      if (deleted === 0) {
        throw new Error('Application not found or already deleted');
      }
      return { success: true, message: 'Application deleted successfully' };
    } catch (error) {
      console.error('Error occurred in delete:', error);
      return { success: false, message: error.message };
    }
  };

  return {
    get,
    create,
    update,
    remove,
  };
};
