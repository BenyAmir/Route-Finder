
class Route {
  constructor(departures = []) {
    this.departures = departures;
    this.totalDuration = this._calculateTotalDuration();
    this.totalConnectionTime = this._calculateWaitingTime();
  }


  addDeparture(departure) {
    this.departures.push(departure);
    this.totalDuration = this._calculateTotalDuration();
    this.totalConnectionTime = this._calculateWaitingTime();
  }


  _calculateTotalDuration() {
    if (this.departures.length === 0) return 0;

    const firstDeparture = this.departures[0];
    const lastDeparture = this.departures[this.departures.length - 1];
    
    return (lastDeparture.arrTime - firstDeparture.depTime) / (1000 * 60);
  }

 
  _calculateWaitingTime() {
    if (this.departures.length <= 1) return 0;
    
    let totalWaitingTime = 0;
    for (let i = 0; i < this.departures.length - 1; i++) {
      const current = this.departures[i];
      const next = this.departures[i + 1];
      totalWaitingTime += (next.depTime - current.arrTime) / (1000 * 60);
    }
    
    return totalWaitingTime;
  }

  
  getStartLocation() {
    return this.departures.length > 0 ? this.departures[0].departureCode : null;
  }

 
  getEndLocation() {
    return this.departures.length > 0 ? 
      this.departures[this.departures.length - 1].arrivalCode : null;
  }

  
  getStartTime() {
    return this.departures.length > 0 ? this.departures[0].depTime : null;
  }

  
  getEndTime() {
    return this.departures.length > 0 ? 
      this.departures[this.departures.length - 1].arrTime : null;
  }

 
  getSummary() {
    return {
      startLocation: this.getStartLocation(),
      endLocation: this.getEndLocation(),
      startTime: this.getStartTime()?.toISOString(),
      endTime: this.getEndTime()?.toISOString(),
      totalDuration: this.totalDuration,
      connectionTime: this.totalConnectionTime,
      numberOfSegments: this.departures.length,
      modes: [...new Set(this.departures.map(d => d.mode))]
    };
  }

 
  toJSON() {
    return {
      summary: this.getSummary(),
      departures: this.departures.map(dep => dep.toJSON())
    };
  }
}

module.exports = Route;