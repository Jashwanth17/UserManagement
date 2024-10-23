const toEntity = (data) => {
    const entity = {
      userId: data.userId,
      applicationId: data.applicationId,
      userName: data.userName,
      password: data.password,
    }
  
    return entity
  }
  
  module.exports = {
    toEntity
  }