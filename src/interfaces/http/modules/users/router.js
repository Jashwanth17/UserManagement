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
  
  // GET user by ID
  router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    console.log('userId', userId);
    getUseCase
      .get(userId)
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  // POST create a new user
  router.post('/', (req, res) => {
    console.log(req.body);
    
    // Check if request body is defined
    if (!req.body) {
      return res.status(400).json({ error: 'User information is missing or incomplete.' });
    }

    // Proceed to create user
    postUseCase
      .create({ body: req.body })
      .then((data) => {
        res.status(Status.OK ||200).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        const errorMsg = error.message || 'Something went wrong.';
        res.status(Status.BAD_REQUEST || 404 ).json({ error: errorMsg });
      });
  });

  // PUT update a user by ID
  router.put('/:userId', (req, res) => {
    // Retrieve user ID from the request parameters
    const userId = req.params.userId;

    putUseCase
      .update({ userId, body: req.body }) // Pass userId to update function
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  // DELETE a user by ID
  router.delete('/:userId', (req, res) => {
    const userId = req.params.userId;

    deleteUseCase
      .remove({ userId }) // Pass userId to remove function
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  return router;
}