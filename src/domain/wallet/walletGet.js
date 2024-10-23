const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData, UUIDValidator } = require('../helper')

const walletGet = t.struct({
  walletId: UUIDValidator
})
module.exports = compose(cleanData, walletGet)