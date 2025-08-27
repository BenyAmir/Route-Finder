
class RouteController {
  constructor(routeService) {
    this.routeService = routeService;
  }


  findRoutes = async (req, res) => {
    try {
      const { from, to, startTime, endTime } = req.query;

      const start = new Date(startTime);
      const end = new Date(endTime);

      const routes = this.routeService.findRoutes(from, to, start, end);

      const response = {
        success: true,
        data: {
          routes: routes.map(route => route.toJSON()),
        }
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to find routes',
        error: error.message
      });
    }
  };


}

module.exports = RouteController;