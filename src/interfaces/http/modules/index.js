const swaggerJSDoc = require('swagger-jsdoc')
const Status = require('http-status')
const { Router } = require('express')
const swaggerUi = require('swagger-ui-express')

module.exports = () => {
  const router = Router()

  // swagger definition without securityDefinitions
  const swaggerDefinition = {
    info: {
      title: 'User Management',
      version: '1.0.0',
      description: 'Available REST Endpoints of User Management'
    },
    host: `${process.env.API_SWAGGER}:${process.env.PORT}/api/${process.env.APP_VERSION}`,
    basePath: '/'
  }

  const options = {
    swaggerDefinition,
    apis: ['src/interfaces/http/modules/**/*.js']
  }

  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options)

  /**
   * @swagger
   * responses:
   *   Unauthorized:
   *     description: Unauthorized
   *   BadRequest:
   *     description: BadRequest / Invalid Input
   */

  /**
   * @swagger
   * /:
   *   get:
   *     tags:
   *       - Status
   *     description: Returns API status
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: API Status
   */
  router.get('/', (req, res) => {
    res.status(Status.OK).json({ status: 'API working' })
  })

  // Swagger UI setup without JWT token security
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  return router
}
