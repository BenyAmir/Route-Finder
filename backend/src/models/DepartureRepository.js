
class DepartureRepository {
  constructor() {
    this._departures = new Map(); // In-memory storage
  }

  get departures() {
    return this._departures;
  }

  save(departure) {
    this.departures.set(departure.id, departure);
  }

  findAll() {
    return Array.from(this.departures.values());
  }

  findByTimeRange(startTime, endTime) {
    return this.findAll().filter(
      (dep) => dep.depTime >= startTime && dep.arrTime <= endTime
    );
  }

  getAllLocations() {
    return Array.from(new Set(this.findAll().map((dep) => dep.departureCode)));
  }

  count() {
    return this.departures.size;
  }
}

module.exports = DepartureRepository;
