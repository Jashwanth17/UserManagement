const t = require('tcomb')
const { compose } = require('ramda')
const {
  cleanData,
  UUIDValidator,
  UserNameValidator,
  PasswordValidator
} = require('../helper')
const users = t.struct({
  id: UUIDValidator,
  userId: UUIDValidator,
  userName: UserNameValidator,
  password: PasswordValidator
})

module.exports = compose(cleanData, users)