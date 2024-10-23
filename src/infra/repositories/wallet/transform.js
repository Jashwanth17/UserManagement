const toEntity = (data) => {
    const entity = {
      userId: data.userId,
      walletId: data.walletId,
      walletAmount: data.walletAmount,
    }
  
    return entity
  }
  
  module.exports = {
    toEntity
  }
