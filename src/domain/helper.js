const t = require('tcomb')
const { complement, compose, isNil, pickBy, trim } = require('ramda')
const { isUUID, } = require('validator')

const notNull = compose(complement(isNil))

const cleanData = (entity) => {
  const trimmedEntity = pickBy(notNull, entity)
  for (const key in trimmedEntity) {
    if (typeof trimmedEntity[key] === 'string') {
      trimmedEntity[key] = trim(trimmedEntity[key])
    }
  }
  return trimmedEntity
}

const UUIDValidator = t.refinement(t.String, (uuid) => isUUID(uuid))

const PasswordValidator = t.refinement(t.String, (password) => {
  // Minimum length check
  if (password.length < 8 || password.length > 16) return false

  // Complexity check
  const complexityRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/
  if (!complexityRegex.test(password)) return false

  // No common patterns or predictable passwords (example patterns)
  const commonPatternsRegex =
    /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*[!@#$%^&*()_+]))[a-zA-Z\d!@#$%^&*()_+]+$/
  if (!commonPatternsRegex.test(password)) return false

  return true
})

// Regular expression to allow only letters (both uppercase and lowercase) and numbers
// Length between 4 and 100 characters
const ApplicationNameValidator = t.refinement(t.String, (applicationName) => {
  const regex = /^[a-zA-Z0-9]{4,100}$/
  return regex.test(applicationName)
})

// Regular expression to allow letters, numbers, spaces, and the specified special characters
// Length between 10 and 200 characters
const DescriptionValidator = t.refinement(t.String, (description) => {
  const regex = /^[\w\s!@#$%^&*()-+=]{10,200}$/
  return regex.test(description)
})

const UserNameValidator = t.refinement(t.String, (username) => {
  if (username.length < 8 || username.length > 50) return false
  const usernameRegex = /^[a-zA-Z0-9!@#$%^&*()-_]+$/
  return usernameRegex.test(username)
})

// Validator for Wallet ID (could be a UUID as well)
const walletIdValidator = UUIDValidator // Assuming it's the same as UUID

// Validator for Wallet Amount (assuming it's a number and non-negative)
const walletAmountValidator = t.refinement(t.Number, (amount) => {
  return amount >= 0
}, 'walletAmountValidator')


module.exports = {
  cleanData,
  UUIDValidator,
  PasswordValidator,
  ApplicationNameValidator,
  DescriptionValidator,
  UserNameValidator,
  walletIdValidator,
  walletAmountValidator
}
