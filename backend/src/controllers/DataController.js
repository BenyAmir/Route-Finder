
class DataController {
  constructor(csvService, departureRepository) {
    this.csvService = csvService;
    this.departureRepository = departureRepository;
  }


  uploadCsv = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No CSV file provided'
        });
      }

      const validationError = this.csvService.validateCsvFile(req.file);
      if (validationError) {
        return res.status(400).json({
          success: false,
          message: validationError
        });
      }

      const result = await this.csvService.processCsvFile(req.file.path);

      const statusCode = result.success ? 200 : 400;
      res.status(statusCode).json(result);

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to process CSV file',
        error: error.message
      });
    }
  };


  getDepartures = async (req, res) => {
    try {
      const { 
        limit = 20, 
        offset = 0, 
        location, 
        mode,
      } = req.query;

      let departures = this.departureRepository.findAll();      

      if (location) {
        const loc = location.toUpperCase();
        departures = departures.filter(d => 
          d.departureCode === loc || d.arrivalCode === loc
        );
      }

      if (mode) {
        departures = departures.filter(d => d.mode === mode.toUpperCase());
      }

      const total = departures.length;
      const paginatedDepartures = departures
        .slice(parseInt(offset), parseInt(offset) + parseInt(limit))
        .map(d => d.toJSON());

      res.json({
        success: true,
        data: {
          departures: paginatedDepartures,
          pagination: {
            total,
            limit: parseInt(limit),
            offset: parseInt(offset),
            hasMore: parseInt(offset) + parseInt(limit) < total
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get departures',
        error: error.message
      });
    }
  };

  getAllLocations = async (req, res) => {
    try {
      const locations = this.departureRepository.getAllLocations();
      res.json({
        success: true,
        data: locations
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get locations',
        error: error.message
      });
    }
  };
}

module.exports = DataController;