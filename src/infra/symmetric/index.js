const crypto = require('crypto')

module.exports = ({ config }) => ({
  signin: () => (payload) => {
    const iv = crypto.randomBytes(16)
    const key = Buffer.alloc(
      32,
      config.authSecret,
      config.characterEncodeMethod
    )
    const cipher = crypto.createCipheriv(config.encryptionMethod, key, iv)
    let encryptedPayload = cipher.update(
      JSON.stringify(payload),
      config.characterEncodeMethod,
      config.encryptionEncodeMethod
    )
    encryptedPayload += cipher.final(config.encryptionEncodeMethod)
    return `${iv.length}${iv.toString(
      config.encryptionEncodeMethod
    )}${encryptedPayload}`
  }
})
