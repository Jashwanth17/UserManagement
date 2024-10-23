const { v4: uuidv4 } = require('uuid');
const { toEntity } = require('./transform');

module.exports = ({ model }) => {
  // Fetch application by applicationId
  const get = async (id) => {
    try {
      const application = await model.findByPk(id, {

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
  const update = ({id,body}) => {

    const updatedData = {
      applicationName:body.applicationName,
      description: body.description
    };
    
    console.log(updatedData);
    return model
      .update(updatedData, {
        where:  { id },
        returning: true,
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
  const remove = async (id) => {
    try {
      const deleted = await model.destroy({
        where: { id }  
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
    remove
  };
};
