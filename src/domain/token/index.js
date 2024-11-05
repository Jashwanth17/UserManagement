const t = require('tcomb')

const Token = t.struct({
  userId: t.Any,
  aplicationId: t.Any
})

module.exports = Token
