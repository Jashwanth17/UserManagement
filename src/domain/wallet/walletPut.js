const t = require('tcomb')
const { compose } = require('ramda')
const {
  cleanData,
  // UUIDValidator,
  // walletIdValidator,
  // walletAmountValidator
} = require('../helper')
const wallet = t.struct({
  userId: t.Any,
  id:t.Any,
  walletAmount:t.Any
})

module.exports = compose(cleanData, wallet)