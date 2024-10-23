const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData, } = require('../helper')

const ApplicationGet = t.struct({
  id: t.Any
})
module.exports = compose(cleanData, ApplicationGet)