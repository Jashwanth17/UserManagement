const t = require('tcomb')
const { compose } = require('ramda')
const {
  cleanData,
  // UUIDValidator,
  // UserNameValidator,
  // PasswordValidator
} = require('../helper')
const users = t.struct({
  id: t.Any,
  userId: t.Any,
  userName: t.Any,
  password: t.Any
})

module.exports = compose(cleanData, users)