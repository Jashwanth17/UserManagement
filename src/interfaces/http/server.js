const express = require('express');

module.exports = ({ config, router, logger }) => {
  const app = express();

  app.disable('x-powered-by');
  
  // Middleware to parse JSON requests
  app.use(express.json());

  // Use the router for handling requests
  app.use(router);

  // Define the static folder for serving files
  app.use(express.static('public'));

  return {
    app,
    start: () => new Promise((resolve) => {
      const http = app.listen(config.port, () => {
        const { port } = http.address();
        logger.info(`🤘 API - Port ${port}`);
        resolve();  // Resolve the promise once the server starts
      });
    })
  };
};
