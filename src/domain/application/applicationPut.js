const t = require('tcomb')
const { compose } = require('ramda')
const {
  cleanData,
  UUIDValidator,
  ApplicationNameValidator,
  DescriptionValidator
} = require('../helper')

const ApplicationPut = t.struct({
  applicationId: UUIDValidator,
  applicationName: ApplicationNameValidator,
  description: DescriptionValidator
})

module.exports = compose(cleanData, ApplicationPut)