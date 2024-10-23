const Status = require('http-status');
const { Router } = require('express');

module.exports = ({
  getUseCase,
  postUseCase,
  logger,
  putUseCase,
  deleteUseCase,
  response: { Success, Fail }
}) => {
  const router = Router();

  // Get wallet by walletId and userId
  router.get('/:walletId', (req, res) => {
    const walletId = req.params.walletId;
    const userId = req.body.userId; 

    getUseCase
      .get(walletId, userId) 
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  // Create new wallet linked with userId and amount
  router.post('/', (req, res) => {
  // Extract userId and amount from request body

    postUseCase
      .create( req.body ) // Pass userId to create function
      .then((data) => {
        res.status(Status.OK ||200).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST || 404 ).json(Fail(error.message));
      });
  });

  // Update wallet linked with userId and walletId, including amount
  router.put('/:walletId', (req, res) => {
    const walletId = req.params.walletId;
    const { userId, amount } = req.body; 

    putUseCase
      .update({ userId, walletId, amount }) 
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  // Delete wallet by walletId linked with userId
  router.delete('/:walletId', (req, res) => {
    const walletId = req.params.walletId;
    const userId = req.body.userId; 

    deleteUseCase
      .remove({ walletId, userId }) 
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
