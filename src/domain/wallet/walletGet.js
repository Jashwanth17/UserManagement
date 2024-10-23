const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData, } = require('../helper')

const walletGet = t.struct({
  id: t.Any,
  walletAmount:t.Any
})
module.exports = compose(cleanData, walletGet)