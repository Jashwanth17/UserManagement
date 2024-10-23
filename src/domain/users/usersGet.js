const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData, UUIDValidator } = require('../helper')

const usersGet = t.struct({
  userId: UUIDValidator
})
module.exports = compose(cleanData, usersGet)