const { walletDelete } = require('../../domain/wallet');

module.exports = ({ walletRepository }) => {
  // Function for deleting a wallet
  const remove = (walletId) => {
    return new Promise((resolve, reject) => {
      const deleteWallet = async () => {
        try {
          const wallet = walletDelete({ walletId }); 
          await walletRepository.remove(wallet); 
          resolve(wallet); 
        } catch (error) {
          reject(new Error(error.message)); 
        }
      };
      deleteWallet();
    });
  };

  return {
    remove,
  };
};
