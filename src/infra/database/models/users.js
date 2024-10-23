const { encryptPassword } = require('../../encryption');

module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
      },

      applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      // hooks: {
      //   beforeCreate: async (user) => {
      //     try {
      //       user.password = await encryptPassword(user.password);
      //     } catch (error) {
      //       console.error('Error encrypting password:', error);
      //     }
      //   }
      // },
      freezeTableName: true,
      timestamps: true,
      updatedAt: 'modifiedAt'
    }
  );

  // Associate Users with Applications
  Users.associate = function (models) {
    Users.belongsTo(models.application, {
      foreignKey: {
        name: 'applicationId',  // Correct foreign key field
        allowNull: false
      },
      onDelete: 'CASCADE'
    });

    // Associate Users with Wallets
    Users.hasMany(models.wallet, {
      foreignKey: 'userId',
    });
  };

  return Users;
};