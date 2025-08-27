const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUsers } = require('../utils/db');


class AuthService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'ttline-secret-key';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h';
    
    this.users = getUsers(this._hashPassword);
  }

  
  _hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  async authenticate(username, password) {
    try {
      const user = this.users.get(username);
      
      if (!user) {
        return {
          success: false,
          message: 'Invalid username or password'
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid username or password'
        };
      }

      const token = this._generateToken(user);
      
      return {
        success: true,
        user: {
          username: user.username,
          role: user.role
        },
        token: token
      };
    } catch (error) {
      return {
        success: false,
        message: 'Authentication failed'
      };
    }
  }

  _generateToken(user) {
    return jwt.sign(
      { 
        username: user.username, 
        role: user.role 
      },
      this.jwtSecret,
      { 
        expiresIn: this.jwtExpiresIn 
      }
    );
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      return null;
    }
  }
}

module.exports = AuthService;