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
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log("applicationId:",id)
    getUseCase
      .get(id)
      .then((data) => {
        res.status(Status.OK ||500).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST||404).json(Fail(error.message));
      });
  });

  // Post Application
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
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    console.log("id is",id)
    putUseCase
      .update({ id, body: req.body })
      .then((data) => {
        res.status(Status.OK||200).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST||404).json(Fail(error.message));
      });
  });

  // Delete Application
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    deleteUseCase
      .remove({ id })
      .then((data) => {
        res.status(Status.OK ||200).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST ||404).json(Fail(error.message));
      });
  });

  return router;
};
