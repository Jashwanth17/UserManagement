const t = require('tcomb');
const { compose } = require('ramda');
const { cleanData, UUIDValidator } = require('../helper');

const ApplicationDelete = t.struct({
  applicationId: UUIDValidator 
});

module.exports = compose(cleanData, ApplicationDelete);
