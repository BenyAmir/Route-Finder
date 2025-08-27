const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const GraphRouteService = require('./services/GraphRouteService'); 
const DepartureRepository = require('./models/DepartureRepository');
const CsvService = require('./services/CsvService');
const AuthService = require('./services/AuthService');

const AuthController = require('./controllers/AuthController');
const DataController = require('./controllers/DataController');
const RouteController = require('./controllers/RouteController');

const createAuthRoutes = require('./routes/auth');
const createDataRoutes = require('./routes/data');
const createRouteRoutes = require('./routes/routes');

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    
    this.initializeServices();
    this.setupMiddleware();    
    this.setupRoutes();  
  }

  initializeServices() {
    this.departureRepository = new DepartureRepository();
    this.routeService = new GraphRouteService(this.departureRepository);
    this.csvService = new CsvService(this.departureRepository);
    this.authService = new AuthService();
    this.authController = new AuthController(this.authService);
    this.dataController = new DataController(this.csvService, this.departureRepository);
    this.routeController = new RouteController(this.routeService);
  }

  setupMiddleware() {
    // Security middleware
    this.app.use(helmet());
    
    // CORS configuration
    this.app.use(cors({
      origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
      credentials: true
    }));
    
    // Body parsing middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true}));

  }

  setupRoutes() {

    // API documentation endpoint
    this.app.get('/api', (req, res) => {
      res.json({
        success: true,
        message: 'TT-Line Route Finder API',
        version: '1.0.0',
        endpoints: {
          auth: {
            'POST /api/auth/login': 'User login',
            'POST /api/auth/logout': 'User logout',
          },
          data: {
            'POST /api/data/upload': 'Upload CSV file with departure data',
            'GET /api/data/departures': 'Get all departures',
            'GET /api/data/locations': 'Get all unique location codes'
          },
          routes: {
            'GET /api/routes/find': 'Find optimal routes between locations'
          }
        },
        authentication: 'Bearer token required for most endpoints'
      });
    });

    // Setup API routes
    this.app.use('/api/auth', createAuthRoutes(this.authController, this.authService));
    this.app.use('/api/data', createDataRoutes(this.dataController, this.authService));
    this.app.use('/api/routes', createRouteRoutes(this.routeController, this.authService));



    // Catch-all route for undefined endpoints
    this.app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        availableEndpoints: '/api'
      });
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🚢 TT-Line Route Finder API is running on port ${this.port}`);
      console.log(`📋 API Documentation: http://localhost:${this.port}/api`);
    });
  }

}

const app = new App();
app.start();

module.exports = App;