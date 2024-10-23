const { walletDelete } = require('../../domain/wallet');

module.exports = ({ walletRepository }) => {
  // Function for deleting a wallet
  const remove = async (userId) => {
    try {
      const validatedid = await walletDelete(userId)
      await walletRepository.remove(validatedid.id)
      return { message: 'wallet deleted successfully' }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return {
    remove
  }
}

