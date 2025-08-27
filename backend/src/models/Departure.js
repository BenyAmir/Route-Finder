
class Departure {
  constructor(data) {
    this.departureCode = data.DEPARTURECODE.trim().toUpperCase();
    this.arrivalCode = data.ARRIVALCODE.trim().toUpperCase();
    this.depTime = data.DEPTIME; 
    this.arrTime = data.ARRTIME; 
    this.deadline = data.DEADLINE; 
    this.pickup = data.PICKUP; 
    this.status = data.STATUS;
    this.releaseTime = data.RELEASETIME; 
    this.mode = data.MODE;
    this.id = this._generateId();
  }


  _generateId() {
    return `${this.departureCode}_${this.arrivalCode}_${this.depTime.getTime()}`;
  }


  isActive() {
    return this.status === 'Open'
  }

  canConnectTo(nextDeparture) {
    if (this.arrivalCode !== nextDeparture.departureCode) {
      return false;
    }
    
    return nextDeparture.depTime > this.arrTime;
    // return nextDeparture.pickup > this.deadline;
  }

  getDuration() {
    return (this.arrTime - this.depTime) / (1000 * 60);
  }


  toJSON() {
    return {
      id: this.id,
      departureCode: this.departureCode,
      arrivalCode: this.arrivalCode,
      depTime: this.depTime.toISOString(),
      arrTime: this.arrTime.toISOString(),
      deadline: this.deadline.toISOString(),
      pickup: this.pickup.toISOString(),
      status: this.status,
      releaseTime: this.releaseTime.toISOString(),
      mode: this.mode,
      duration: this.getDuration()
    };
  }
}

module.exports = Departure;