const t = require('tcomb')
const { compose } = require('ramda')
const {
  cleanData,
  // UUIDValidator,
  // walletIdValidator,
  // walletAmountValidator
} = require('../helper')
const walletPost = t.struct({
  userId: t.Any,
  walletAmount: t.Any
})

module.exports = compose(cleanData, walletPost)