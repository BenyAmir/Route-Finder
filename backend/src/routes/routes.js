const express = require('express');
const { validate, validateRouteRequest } = require('../middleware/validationGuard');
const { routeSchemas } = require('../utils/validation');
const { authenticateToken } = require('../middleware/auth');


function createRouteRoutes(routeController, authService) {
  const router = express.Router();

  router.use(authenticateToken(authService));


  router.get('/find',
    validate(routeSchemas.findRoutes, 'query'),
    validateRouteRequest,
    routeController.findRoutes
  );



  return router;
}

module.exports = createRouteRoutes;