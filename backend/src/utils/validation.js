const Joi = require('joi');


const authSchemas = {
  login: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required()
  })
};

const routeSchemas = {
  findRoutes: Joi.object({
    from: Joi.string().min(1).max(10).required()
      .description('Departure location code'),
    to: Joi.string().min(1).max(10).required()
      .description('Arrival location code'),
    startTime: Joi.date().iso().required()
      .description('Earliest departure time (ISO 8601 format)'),
    endTime: Joi.date().iso().min(Joi.ref('startTime')).required()
      .description('Latest arrival time (ISO 8601 format)'),
  })
};

const sanitizeLocationCode = (locationCode) => {
  return locationCode?.toString().trim().toUpperCase();
};


const validateDateRange = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  if (isNaN(start.getTime())) {
    return { valid: false, message: 'Invalid start time format' };
  }
  
  if (isNaN(end.getTime())) {
    return { valid: false, message: 'Invalid end time format' };
  }
  
  if (start >= end) {
    return { valid: false, message: 'Start time must be before end time' };
  }
  
  return { valid: true };
};




module.exports = {
  authSchemas,
  routeSchemas,
  sanitizeLocationCode,
  validateDateRange
};