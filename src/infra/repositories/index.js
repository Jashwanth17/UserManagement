const Application = require('./application')
const User = require('./users')
const wallet = require('./wallet')

module.exports = ({ database }) => {
  const applicationModel = database.models.application
  const userModel = database.models.users
  const walletModel = database.models.wallet
  
  return {
    applicationRepository: Application({ model: applicationModel }),
    usersRepository: User({ model: userModel }),
    walletRepository: wallet({ model: walletModel }),
  }
}