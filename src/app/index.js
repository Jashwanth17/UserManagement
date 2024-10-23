module.exports = ({ server, database }) => {
    return {
      start: () =>
        Promise.resolve()
          .then(database.authenticate)  // Authenticating the database
          .then(server.start)            // Starting the server
    }
  }
  