const { walletPost } = require('../../../src/domain/wallet');

/**
 * Function for creating a wallet.
 */
module.exports = ({ walletRepository }) => {
  const create = ( body) => {
    return Promise.resolve()
      .then(() => {
        const wallet = walletPost(body); 
        return walletRepository.create({wallet}); 
      })
      .catch((error) => {
        throw new Error(error); 
      });
  };

  return {
    create,
  };
};
