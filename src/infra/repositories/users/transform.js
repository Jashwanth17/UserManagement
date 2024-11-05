const toEntity = (data) => {
    const entity = {
      userId: data.id,
      applicationId: data.applicationId,
      // userName: data.userName,
      // password: data.password,
    }
  
    return entity
  }
  
  module.exports = {
    toEntity
  }