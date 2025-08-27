const fs = require('fs');
const csv = require('csv-parser');
const Departure = require('../models/Departure');
const DateService = require('./DateService');


class CsvService {
  constructor(departureRepository) {
    this.departureRepository = departureRepository;
  }

 
  _parseEuropeanDate(dateString) {
    if (!dateString || typeof dateString !== 'string') {
      throw new Error('Invalid date string');
    }

    // Handle format: "29.07.2024 07:05"
    const match = dateString.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})\s+(\d{1,2}):(\d{2})$/);
    
    if (!match) {
      throw new Error(`Invalid date format: ${dateString}. Expected format: DD.MM.YYYY HH:mm`);
    }

    const [, day, month, year, hour, minute] = match;
    
    // Create date (month is 0-indexed in JavaScript)
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
    
    // Validate the date
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${dateString}`);
    }
    
    return date;
  }

  
  async processCsvFile(filePath) {
    return new Promise((resolve, reject) => {
      const results = [];
      const errors = [];
      let processedCount = 0;
      let savedCount = 0;

      fs.createReadStream(filePath)
        .pipe(csv({
          separator: ';',
          mapHeaders: ({ header }) => header.trim().toUpperCase()
        }))
        .on('data', (data) => {
          try {
            processedCount++;
            
            const validationError = this._validateCsvRow(data);
            if (validationError) {
              errors.push({
                row: processedCount,
                error: validationError,
                data: data
              });
              return;
            }

            const departure = new Departure(data);
            this.departureRepository.save(departure);
            savedCount++;
            
            results.push(departure.toJSON());
          } catch (error) {
            errors.push({
              row: processedCount,
              error: error.message,
              data: data
            });
          }
        })
        .on('end', () => {
          this._cleanupFile(filePath);
          
          resolve({
            success: true,
            processedRows: processedCount,
            savedDepartures: savedCount,
            errors: errors,
          });
        })
        .on('error', (error) => {
          this._cleanupFile(filePath);
          reject({
            success: false,
            error: `CSV processing failed: ${error.message}`,
            processedRows: processedCount,
            savedDepartures: savedCount,
            errors: errors
          });
        });
    });
  }

  
  _validateCsvRow(data) {
    const requiredFields = [
      'DEPARTURECODE', 'ARRIVALCODE', 'DEPTIME', 'ARRTIME',
      'DEADLINE', 'PICKUP', 'STATUS', 'RELEASETIME', 'MODE'
    ];

    for (const field of requiredFields) {
      if (!data[field] || data[field].trim() === '') {
        return `Missing required field: ${field}`;
      }
    }

    const dateFields = ['DEPTIME', 'ARRTIME', 'DEADLINE', 'PICKUP', 'RELEASETIME'];
    for (const field of dateFields) {
      try {
        data[field] = DateService.parseEuropeanDate(data[field]);
      } catch (error) {
        return `Invalid date format in field ${field}: ${error.message}`;
      }
    }

    const validStatuses = ['CANCELLED', 'CLOSED', 'OPEN'];
    if (!validStatuses.includes(data.STATUS.toUpperCase())) {
      return `Invalid status: ${data.STATUS}. Must be one of: ${validStatuses.join(', ')}`;
    }

    const validModes = ['TRAIN', 'SHIP'];
    if (!validModes.includes(data.MODE.toUpperCase())) {
      return `Invalid mode: ${data.MODE}. Must be one of: ${validModes.join(', ')}`;
    }

    const depTime = data.DEPTIME;
    const arrTime = data.ARRTIME;

    if (arrTime <= depTime) {
      return 'Arrival time must be after departure time';
    }

    return null;
  }

  _cleanupFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.warn(`Failed to cleanup file ${filePath}:`, error.message);
    }
  }

  validateCsvFile(file) {
    if (!file) {
      return 'No file provided';
    }

    if (!file.originalname.toLowerCase().endsWith('.csv')) {
      return 'File must be a CSV file';
    }

    if (file.size === 0) {
      return 'File is empty';
    }

    return null;
  }

}

module.exports = CsvService;