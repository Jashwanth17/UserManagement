const { v4: uuidv4 } = require('uuid');
const { toEntity } = require('./transform');

module.exports = ({ model }) => {
  // Fetch application by applicationId
  const get = async (applicationId) => {
    try {
      const application = await model.findByPk(applicationId, {
        attributes: ['id', 'applicationId', 'applicationName', 'description']
      });
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
  const create = (applicationData) => {
    // Generate UUID for the id field
    const newApplicationData = {
      applicationName: applicationData.applicationName,
      description: applicationData.description
    };
    
    console.log('applicationData', newApplicationData);

    return model.create(newApplicationData).then((response) => {
      return toEntity(response); 
    }).catch((error) => {
      console.error('Error occurred in create:', error);
      throw error;
    });
  };

  // Update an existing application
  const update = (applicationData) => {
    const applicationId = applicationData.applicationId;
    const updatedData = {
      applicationName: applicationData.applicationName,
      description: applicationData.description
    };
    
    console.log(updatedData);
    return model
      .update(updatedData, {
        where: { applicationId },
        returning: true,
        attributes: ['id', 'applicationId', 'applicationName', 'description']
      })
      .then((result) => {
        if (result[0] === 0) {
          throw new Error('Application ID not found in the database');
        }
        return result[1][0]; // Returning the updated entity
      })
      .catch((error) => {
        console.error('Error occurred in update:', error);
        throw error;
      });
  };

  // Delete an application by applicationId
  const remove = async (applicationId) => {
    try {
      const deleted = await model.destroy({
        where: { applicationId }
      });
      if (deleted === 0) {
        throw new Error('Application not found or already deleted');
      }
      return { success: true, message: 'Application deleted successfully' };
    } catch (error) {
      console.error('Error occurred in delete:', error);
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
