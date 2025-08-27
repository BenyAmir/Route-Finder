class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const result = await this.authService.authenticate(username, password);
      
      if (result.success) {
        res.json({
          success: true,
          message: 'Login successful',
          data: {
            user: result.user,
            token: result.token
          }
        });
      } else {
        res.status(401).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Login failed',
        error: error.message
      });
    }
  };


  logout = async (req, res) => {
    try {
      res.json({
        success: true,
        message: 'Logout successful.'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Logout failed',
        error: error.message
      });
    }
  };
}

module.exports = AuthController;