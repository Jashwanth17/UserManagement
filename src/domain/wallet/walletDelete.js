const t = require('tcomb')
const { compose } = require('ramda')
const {
  cleanData,
  //UUIDValidator
} = require('../helper')

// Define the structure for the delete operation
const walletDelete = t.struct({
  id:t.Any 
})

module.exports = compose(cleanData, walletDelete)