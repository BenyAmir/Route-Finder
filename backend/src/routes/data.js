const express = require('express');
const multer = require('multer');
const path = require('path');
const { authenticateToken } = require('../middleware/auth');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'text/csv' || 
        file.originalname.toLowerCase().endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed!'), false);
    }
  },
});


function createDataRoutes(dataController, authService) {
  const router = express.Router();

  router.use(authenticateToken(authService));

 
  router.post('/upload',
    upload.single('file'),
    dataController.uploadCsv
  );

 router.get('/departures', dataController.getDepartures);

  router.get('/locations', dataController.getAllLocations);

  return router;
}

module.exports = createDataRoutes;