const t = require('tcomb')
const { compose } = require('ramda')
const {
  cleanData,
  //UUIDValidator
} = require('../helper')

// Define the structure for the delete operation
const UserDelete = t.struct({
  id: t.Any
})

module.exports = compose(cleanData, UserDelete)
