const t = require('tcomb')
const { compose } = require('ramda')
const {
  cleanData,
  UUIDValidator,
  walletIdValidator,
  walletAmountValidator
} = require('../helper')
const wallet = t.struct({
  userId: UUIDValidator,
  walletIdValidator,
  walletAmountValidator
})

module.exports = compose(cleanData, wallet)