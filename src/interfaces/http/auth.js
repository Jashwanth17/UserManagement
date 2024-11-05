const passport = require('passport')
const crypto = require('crypto')
const { Strategy } = require('passport-strategy')
const moment = require('moment')

class SymmetricTokenStrategy extends Strategy {
    constructor (options, verify) {
      super()
      this._validateOptions(options, verify)
      this._initializeOptions(options)
      this._verify = verify
      this.name = 'symmetric-token'
    }

_validateOptions (options, verify) {
    if (!options?.secretOrKey || !verify) {
       throw new Error('SymmetricTokenStrategy requires a secretOrKey and verify callback')
        }
      }

      _initializeOptions (options) {
        this._secretOrKey = options.secretOrKey
        this.encryptionMethod = options.encryptionMethod
        this.characterEncodeMethod = options.characterEncodeMethod
        this.encryptionEncodeMethod = options.encryptionEncodeMethod
      }
    
      authenticate (req) {
        console.log('Authenticating using SymmetricTokenStrategy...')
    
        const token = this._getTokenFromRequest(req)
        console.log('Token:', token)
    
        if (!token) {
          console.log('Token not found')
          return this.fail(new Error('Token not found'))
        }
    
        const { iv, encryptedToken } = this._parseToken(token)
    
        const key = Buffer.alloc(32, this._secretOrKey, this.characterEncodeMethod)
    
        const decryptedToken = this._decryptToken(encryptedToken, key, iv)
    
        const payload = JSON.parse(decryptedToken)
        console.log('Decrypted token payload:', payload)
    
        const currentTimestamp = moment().unix()
        if (payload.expiry && currentTimestamp > payload.expiry) {
          console.log('Token expired')
          return this.fail('Token expired')
        }
    
        this._verify(payload, (err, user) => {
          if (err) {
            console.log('Error during verification:', err.message)
            return this.error(err)
          }
          if (!user) {
            console.log('Unauthorized user')
            return this.fail('Unauthorized')
          }
          console.log('Authenticated user:', user)
          this.success(user)
        })
      }
    
      _getTokenFromRequest (req) {
        return req.headers.authorization || ''
      }
    
      _parseToken (token) {
        const ivLength = parseInt(token.slice(0, 2), 10)
        const iv = Buffer.from(
          token.slice(2, 2 + ivLength * 2),
          this.encryptionEncodeMethod
        )
        const encryptedToken = token.slice(2 + ivLength * 2)
        return { iv, encryptedToken }
      }
    
      _decryptToken (encryptedToken, key, iv) {
        const decipher = crypto.createDecipheriv(this.encryptionMethod, key, iv)
        let decryptedToken
        try {
          decryptedToken = decipher.update(
            encryptedToken,
            this.encryptionEncodeMethod,
            this.characterEncodeMethod
          )
          decryptedToken += decipher.final(this.characterEncodeMethod)
        } catch (err) {
          console.log('Failed to decrypt token:', err.message)
          throw new Error('Failed to decrypt token')
        }
        return decryptedToken
      }
    }
    
    module.exports = ({ config, repository: { usersRepository } }) => {
      console.log('Initializing SymmetricTokenStrategy...')
    
      const strategyOptions = {
        secretOrKey: config.authSecret,
        encryptionMethod: config.encryptionMethod,
        characterEncodeMethod: config.characterEncodeMethod,
        encryptionEncodeMethod: config.encryptionEncodeMethod
      }
    
      const strategyVerifyCallback = (payload, done) => {
        console.log('Verifying user...')
    
        usersRepository
          .findByDetails(payload.userId, payload.applicationId)
          .then((user) => {
            console.log('User found:', user)
            done(null, user)
          })
          .catch((error) => {
            console.log('Error during user verification:', error.message)
            done(error, null)
          })
      }
    
      const strategy = new SymmetricTokenStrategy(
        strategyOptions,
        strategyVerifyCallback
      )
    
      passport.use(strategy)
    
      passport.serializeUser((user, done) => {
        console.log('Serializing user:', user)
        done(null, user.id)
      })
    
      passport.deserializeUser((id, done) => {
        console.log('Deserializing user with id:', id)
    
        usersRepository
          .findById(id)
          .then((user) => {
            console.log('Deserialized user:', user)
            done(null, user)
          })
          .catch((error) => {
            console.log('Error during deserialization:', error.message)
            done(error, null)
          })
      })
    
      return {
        initialize: () => {
          console.log('Initializing Passport...')
          return passport.initialize()
        },
        authenticate: () => {
          console.log('Authenticating using Passport...')
          return passport.authenticate('symmetric-token', { session: false })
        }
      }
    }
    