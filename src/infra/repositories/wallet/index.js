const { walletAmountValidator } = require('../../../domain/helper');
const { toEntity } = require('./transform');
const { v4: uuidv4 } = require('uuid');

module.exports = ({ model }) => {

  // Get wallet by walletId (which is the same as userId)
  const get = async (walletId) => {
    try {
      const wallet = await model.findOne({
        where: { walletId },
      });
      if (!wallet) {
        throw new Error('Wallet not found');
      }
      return toEntity(wallet.dataValues);
    } catch (error) {
      console.error('Error occurred in get:', error);
      throw error;
    }
  };

  // Create new wallet with userId (same as walletId)
  const create = async ({wallet}) => {
    

    // const existingWallet = await model.findOne({
    //   where: { walletId: walletArg.walletId }
    // });
    // if (existingWallet) {
    //   throw new Error('Wallet already exists for this walletId');
    // }

    const walletData = {
      walletId:wallet.walletId,                  
      userId: wallet.userId,          
      walletAmount: wallet.walletAmount,
    };

    return model
      .create(walletData)
      .then((response) => toEntity(response.dataValues));
  };

  // Update wallet by walletId (same as userId)
  const update = async (...args) => {
    const walletId = args[0].walletId;
    const updatedData = args[0];
    updatedData.modifiedBy = ''; 

    const existingWallet = await model.findOne({
      where: { walletId }
    });
    if (!existingWallet) {
      throw new Error('Wallet not found');
    }

    return model
      .update(updatedData, { where: { walletId } })
      .then(([result]) => {
        if (result === 0) {
          throw new Error('Wallet not found or could not be updated');
        }
        return result;
      });
  };

  // Delete wallet by walletId (same as userId)
  const remove = async (walletId) => {
    try {
      const deleted = await model.destroy({
        where: { walletId }
      });
      if (!deleted) {
        throw new Error('Wallet not found or could not be deleted');
      }
      return deleted;
    } catch (error) {
      console.error('Error deleting wallet:', error);
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
