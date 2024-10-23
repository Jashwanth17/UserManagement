const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = ({ config, basePath }) => {
  // Initialize Sequelize with the provided database configuration
  const sequelize = new Sequelize(config.db.url, { ...config.db });

  // Define the db object to hold Sequelize instance, Sequelize library, and models
  const db = {
    sequelize,
    Sequelize,
    models: {}
  };

  // Dynamically load models from the './models' directory
  const dir = path.join(basePath, './models');
  fs.readdirSync(dir).forEach((file) => {
    const modelPath = path.join(dir, file);

    try {
      // Check if the model file exports a function or an object
      const model = require(modelPath);
      
      // If it's a function, it will be called with sequelize and Sequelize.DataTypes
      if (typeof model === 'function') {
        const modelInstance = model(sequelize, Sequelize.DataTypes);
        db.models[modelInstance.name] = modelInstance;
      } else {
        // If it's not a function, assume it's already a model object
        if (model.name) {
          db.models[model.name] = model;
        } else {
          console.warn(`Model file ${file} does not have a valid name export.`);
        }
      }
    } catch (error) {
      console.error(`Error loading model ${file}:`, error);
    }
  });

  // Set up model associations if any exist
  Object.keys(db.models).forEach((key) => {
    if ('associate' in db.models[key]) {
      db.models[key].associate(db.models);
    }
  });

  

 // Synchronize models with the database
  // db.sequelize
  //    .sync({ force: true }) // Set force to true to drop and re-create the tables
  //   .then(() => {
  //    console.log("All models synchronized with the database");
  //   })
  //   .catch((error) => {
  //      console.error("Error synchronizing models:", error);
  //   });

  // Return the db object
  return db;
};
