// require('dotenv').config()
// const bcrypt = require('bcrypt')
// const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)

// const encryptPassword = async (password) => {
//   try {
//     const salt = await bcrypt.genSalt(SALT_ROUNDS)
//     const hashedPassword = await bcrypt.hash(password, salt)
//     return hashedPassword
//   } catch (error) {
//     console.error('Error encrypting password:', error)
//     throw error
//   }
// }

// const comparePassword = async (password, encodedPassword) => {
//   try {
//     return await bcrypt.compare(password, encodedPassword)
//   } catch (error) {
//     console.error('Error comparing passwords:', error)
//     throw error
//   }
// }

// module.exports = {
//   encryptPassword,
//   comparePassword
// }
