const Status = require('http-status');
const { Router } = require('express');

module.exports = ({
  getUseCase,
  postUseCase,
  putUseCase,
  deleteUseCase,
  logger,
  response: { Success, Fail }
}) => {
  const router = Router();

  // Get Application
  router.get('/:applicationId', (req, res) => {
    const applicationId = req.params.applicationId;
    getUseCase
      .get(applicationId)
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  // Post Application
//   router.post('/', (req, res) => {
//     postUseCase
//       .create({ body: req.body })
//       .then((data) => {
//         res.status(Status.OK).json(Success(data));
//       })
//       .catch((error) => {
//         logger.error(error);
//         res.status(Status.BAD_REQUEST || 404).json(Fail(error.message));
//       });
//   });


router.post('/', (req, res) => {
    // Log the incoming request body
    console.log('Incoming request body:', req.body);
    postUseCase
      .create({ body: req.body })
      .then((data) => {
        res.status(Status.OK || 500).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        // Log the error details
        console.error('Database error:', error);
        res.status(Status.BAD_REQUEST || 404).json(Fail(error.message));
      });
  });
  

  // Put Application
  router.put('/:applicationId', (req, res) => {
    const applicationId = req.params.applicationId;
    putUseCase
      .update({ applicationId, body: req.body })
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  // Delete Application
  router.delete('/:applicationId', (req, res) => {
    const applicationId = req.params.applicationId;
    deleteUseCase
      .remove({ applicationId })
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  return router;
};
