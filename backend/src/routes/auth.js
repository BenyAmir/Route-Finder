const express = require('express');
const { validate } = require('../middleware/validationGuard');
const { authSchemas } = require('../utils/validation');
const { authenticateToken, requireRole } = require('../middleware/auth');


function createAuthRoutes(authController, authService) {
  const router = express.Router();

 
  router.post('/login', 
    validate(authSchemas.login, 'body'),
    authController.login
  );



  router.post('/logout',
    authenticateToken(authService),
    authController.logout
  );


  return router;
}

module.exports = createAuthRoutes;