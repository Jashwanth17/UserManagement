const toEntity = (data) => {
  const entity = {
    id: data.id, 
    applicationId: data.applicationId, // Integer applicationId
    applicationName: data.applicationName,
    description: data.description,
  };

  return entity;
};

module.exports = {
  toEntity,
};