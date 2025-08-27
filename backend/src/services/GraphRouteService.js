const Route = require('../models/Route');
const PriorityQueue = require('../utils/priorityQueue');


class GraphRouteService {
  constructor(departureRepository) {
    this.departureRepository = departureRepository;
  }

  
  _buildGraph(startTime, endTime) {
    const graph = new Map(); 
    const departures = this.departureRepository
      .findByTimeRange(startTime, endTime).filter(dep => dep.isActive());

    const locations = new Set();
    departures.forEach(dep => {
      locations.add(dep.departureCode);
      locations.add(dep.arrivalCode);
    });

    locations.forEach(location => {
      graph.set(location, []);
    });

    departures.forEach(departure => {
        graph.get(departure.departureCode).push({
          to: departure.arrivalCode,
          departure: departure,
          duration: departure.getDuration(),
        });
    });

    return { graph, departures };
  }

  
  _findPossibleFastestRoutes(graph, start, end, startTime, endTime) {
    const pq = new PriorityQueue();
    const routes = [];

    pq.enqueue({
      location: start,
      time: startTime,
      totalDuration: 0,
      path: [],
      shipUsed: false,
      visitedLocations: new Set([start])
    }, 0);

    while (!pq.isEmpty()) {
      const current = pq.dequeue();
      const {  location,  time, totalDuration, path , shipUsed, visitedLocations } = current;

      if (location === end && path.length > 0) {
        const route = new Route(path);
        if (route.getEndTime() <= endTime) {
          routes.push(route);
        }
        continue; 
      }

      
      const neighbors = graph.get(location) || [];
      
      for (const edge of neighbors) {
        const { to, departure, duration } = edge;
        
        const isWithShip = departure.mode === 'SHIP';
        if (isWithShip && shipUsed) continue; // only one ship per route
        
        if (visitedLocations.has(to)) continue;
        
        if (path.length > 0) {
          const lastDeparture = path[path.length - 1];
          if (!lastDeparture.canConnectTo(departure)) {
            continue;
          }
        }

        const newTime = departure.arrTime;
        const newTotalDuration = totalDuration + duration;
        const newPath = [...path, departure];
        const newVisited = new Set([...visitedLocations, to]);

        if (newTime <= endTime ) {
          pq.enqueue({
            location: to,
            time: newTime,
            totalDuration: newTotalDuration,
            path: newPath,
            shipUsed: isWithShip || shipUsed,
            visitedLocations: newVisited
          }, newTotalDuration);
        }
      }
    }

    return routes.sort((a, b) => a.totalDuration - b.totalDuration );
  }


  findRoutes(from, to, startTime, endTime) {
    
    const { graph, departures } = this._buildGraph(startTime, endTime);
    const routes = this._findPossibleFastestRoutes(graph, from, to, startTime, endTime);
    
    return routes;
  }
}

module.exports = GraphRouteService;