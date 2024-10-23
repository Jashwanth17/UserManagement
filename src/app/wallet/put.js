const { walletPut } = require('../../../src/domain/wallet');

module.exports = ({ walletRepository }) => {
  const update = (body) => {
    return new Promise((resolve, reject) => {
      const updateWallet = async () => {
        try {
          const wallet = walletPut(body); 
          const updatedWallet = await walletRepository.update(wallet); 
          resolve(updatedWallet); 
        } catch (error) {
          reject(new Error(error.message)); 
        }
      };
      updateWallet();
    });
  };

  return {
    update,
  };
};
