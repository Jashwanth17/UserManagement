const statusMonitor = require('express-status-monitor');
const bodyParser = require('body-parser');
const compression = require('compression');
const { Router } = require('express');
const { partialRight } = require('ramda');
const controller = require('./utils/create_controller');
const httpLogger = require('./middlewares/http_logger');
const errorHandler = require('./middlewares/error_handler');

module.exports = ({ config, logger }) => {
  const router = Router();

  /* istanbul ignore if */
  if (config.env === 'development') {
    router.use(statusMonitor());
  }

  const apiRouter = Router();
  apiRouter.use(bodyParser.json());
  apiRouter.use(compression());

  apiRouter.use('/', controller('index'));
  apiRouter.use('/application', controller('application').router);
  apiRouter.use('/users', controller('users').router);
  apiRouter.use('/wallet', controller('wallet').router);

  apiRouter.use('*', (req, res) => {
    res.status(404).send('Error: Route not found');
  });

  router.use(`/api/`, apiRouter);
  router.use(partialRight(errorHandler, [logger, config]));

  return router;
};
