const { encryptPassword } = require('../../encryption')

module.exports = function (sequelize, DataTypes) {
  const wallet = sequelize.define(
    'wallet',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
      },


      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      walletAmount: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          try {
            user.password = await encryptPassword(user.password)
          } catch (error) {
            console.error('Error encrypting password:', error)
          }
        }
      },
      freezeTableName: true,
      timestamps: true,
      updatedAt: 'modifiedAt'
    }
  )

  wallet.associate = function (models) {
    wallet.belongsTo(models.users, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: 'CASCADE'
    })
}

  return wallet
}