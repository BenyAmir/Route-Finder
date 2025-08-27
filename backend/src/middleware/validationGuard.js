const { sanitizeLocationCode, validateDateRange } = require('../utils/validation');

const validateRouteRequest = (req, res, next) => {
  const { from, to, startTime, endTime } = req.query;
  
  req.query.from = sanitizeLocationCode(from);
  req.query.to = sanitizeLocationCode(to);
  
  if (req.query.from === req.query.to) {
    return res.status(400).json({
      success: false,
      message: 'Departure and arrival locations cannot be the same'
    });
  }
  
  const dateValidation = validateDateRange(startTime, endTime);
  if (!dateValidation.valid) {
    return res.status(400).json({
      success: false,
      message: dateValidation.message
    });
  }
  
  next();
};


const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorDetails
      });
    }
    
    // Replace the request property with the validated and sanitized data
    req[property] = value;
    next();
  };
};


module.exports = {
  validate,
  validateRouteRequest
};