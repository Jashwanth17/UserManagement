const { walletGet } = require('../../../src/domain/wallet');

module.exports = ({ walletRepository, usersRepository }) => {
  const get = async (walletId) => {
    try {
    
      const validatedWalletId = await walletGet({ walletId });

      const wallet = await walletRepository.get(validatedWalletId.walletId);

      const user = await usersRepository.get(wallet.userId);

      const extractedWallet = {
        userId: user.userId,
        walletId: wallet.walletId,
        walletAmount: wallet.amount,
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
