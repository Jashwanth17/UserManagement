const { walletPut } = require('../../../src/domain/wallet');

module.exports = ({ walletRepository }) => {
  const update = (id, { body }) => {
    return new Promise((resolve, reject) => {
      const updateWallet = async () => {
        try {
          const wallet = walletPut({ id, body });
          await walletRepository.update({ id, body });
          resolve({ id, body });
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
