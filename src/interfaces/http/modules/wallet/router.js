const Status = require('http-status');
const { Router } = require('express');

module.exports = ({
  getUseCase,
  postUseCase,
  logger,
  putUseCase,
  deleteUseCase,
  auth,
  response: { Success, Fail }
}) => {
  const router = Router();
  
  // Apply authentication to all routes
  router.use(auth.authenticate());

  // Get wallet by walletId and userId
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    const userId = req.body.userId;

    getUseCase
      .get(id, userId)
      .then((data) => {
        res.status(Status.OK || 200).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST || 404).json(Fail(error.message));
      });
  });

  // Create new wallet linked with userId and amount
  router.post('/', (req, res) => {
    postUseCase
      .create(req.body)
      .then((data) => {
        res.status(Status.OK || 200).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST || 404).json(Fail(error.message));
      });
  });

  // Update wallet linked with userId and walletId, including amount
  router.put('/:id', (req, res) => {
    const id = req.params.id;

    putUseCase
      .update(id, { body: req.body })
      .then((data) => {
        res.status(Status.OK || 200).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST || 404).json(Fail(error.message));
      });
  });

  // Delete wallet by walletId linked with userId
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const userId = req.body.userId;

    deleteUseCase
      .remove({ id, userId })
      .then((data) => {
        res.status(Status.OK || 200).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST || 404).json(Fail(error.message));
      });
  });

  return router;
};
