const t = require('tcomb')
const { compose } = require('ramda')
const {
  cleanData,
  UserNameValidator,
  PasswordValidator
} = require('../helper')
const usersPost = t.struct({
  applicationId: t.Integer,
  userName: UserNameValidator,
  password: PasswordValidator
})

module.exports = compose(cleanData, usersPost)