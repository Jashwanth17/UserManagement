const Status = require('http-status')
const { Router } = require('express')

module.exports = ({ postUseCase, logger, response: { Success, Fail } }) => {
  const router = Router()

  router.post('/', (req, res) => {
    postUseCase
      .validate({ body: req.body })
      .then((data) => {
        res.status(Status.OK ||200).json(Success(data))
      })
      .catch((error) => {
        logger.error(error)
        res.status(Status.BAD_REQUEST ||404).json(Fail(error.message))
      })
  })

  return router
}
