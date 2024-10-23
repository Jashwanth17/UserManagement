const { walletGet } = require('../../../src/domain/wallet');
const { walletAmountValidator } = require('../../domain/helper');

module.exports = ({ walletRepository,}) => {
  const get = async (id) => {
    try {
    
      const validatedid = await walletGet({ id });

      const wallet = await walletRepository.get(validatedid.id);

      const extractedWallet = {
        userId: wallet.userId,
        walletAmount: wallet.walletAmount
      };

      return extractedWallet;
    } catch (error) {
      console.error('Error occurred in get:', error);
      throw error;
    }
  };

  return {
    get,
  };
};
