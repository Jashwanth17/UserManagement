module.exports = {
    version: process.env.APP_VERSION,
    port: process.env.PORT || 9000,
    timezone: process.env.TIMEZONE,
    logging: {
      maxsize: 100 * 1024, // 100mb
      maxFiles: 2,
      colorize: false
    },
    authSecret: process.env.AUTHSECRET,
    expiryTime: process.env.EXPIRYTIME,
    encryptionMethod: process.env.ENCRYPTION_METHOD,
    characterEncodeMethod: process.env.CHARACTER_ENCODING_METHOD,
    encryptionEncodeMethod: process.env.ENCRYPTION_ENCODE_METHOD,
    authSession: {
      session: false
    }
  }
  