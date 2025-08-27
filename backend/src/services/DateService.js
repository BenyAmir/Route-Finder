class DateService {
    static parseEuropeanDate(dateString) {
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
}

module.exports = DateService;