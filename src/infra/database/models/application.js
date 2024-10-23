module.exports = function (sequelize, DataTypes, UUIDV4) {
    const Application = sequelize.define('application', {
  
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      applicationName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      updatedAt: 'modifiedAt'
    });
  
    Application.associate = function(models) {
      Application.hasMany(models.users, {
        foreignKey: 'applicationId', 
        onDelete: 'CASCADE'
      });
    };
  
    return Application;
  };
