const t = require('tcomb');
const { compose } = require('ramda');
const { cleanData, } = require('../helper');

const ApplicationDelete = t.struct({
  id: t.Any 
});

module.exports = compose(cleanData, ApplicationDelete);
