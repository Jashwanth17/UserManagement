const Token = require('../../../src/domain/token');
const moment = require('moment');
require('dotenv').config();

module.exports = ({ config, usersRepository, webToken }) => {
  const logIncomingCredentials = (body) => {
    console.log('Incoming credentials:', body);
  };

  const parseCredentials = (body) => {
    // const credentials = Token(body);
    const credentials = body;
    console.log('Parsed credentials:', credentials); // Ensure applicationId is present and correctly named
    return credentials;
  };

  const findUserCredentials = async (userId, applicationId) => {
    const userCredentials = await usersRepository.findOne(userId, applicationId)
    console.log('User credentials:', userCredentials)
    return userCredentials
  }

  // const validatePassword = (userPassword, providedPassword) => {
  //   const validatePass = usersRepository.validatePassword(userPassword);
  //   if (!validatePass(providedPassword)) {
  //     console.log('Invalid password:', providedPassword);
  //     throw new Error('Invalid Credentials');
  //   }
  // };

  const generateToken = (userId, applicationId, expiry) => {
    const signIn = webToken.signin();
    const token = signIn({ userId, applicationId, expiry });
    console.log('Generated token:', token);
    return token;
  };

  const validate = async ({ body }) => {
    try {
      logIncomingCredentials(body);
      const credentials = parseCredentials(body);
      
      // Check if userCredentials is valid before calling validatePassword
      const userCredentials = await findUserCredentials(credentials.userId, credentials.applicationId);
      if (!userCredentials) {
        throw new Error('User not found');
      }

      // validatePassword(userCredentials.password, credentials.password);

      const expiresInMinutes = parseInt(process.env.EXPIRYTIME, 10);
      const expiry = moment().add(expiresInMinutes, 'minutes').unix();
      const token = generateToken(
        userCredentials.userId,
        userCredentials.applicationId,
        expiry
      );

      return { token };
    } catch (error) {
      console.error('Error occurred during validation:', error);
      throw error;
    }
  };

  return {
    validate,
  };
};
