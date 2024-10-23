const toEntity = (data) => {
  const entity = {
    id: data.id, 
    applicationName: data.applicationName,
    description: data.description,
  };

  return entity;
};

module.exports = {
  toEntity,
};