
/**
 * Format UTC date string to local time display (without timezone info)
 * @param utcDateString - ISO date string from server (e.g., "2024-08-06T19:30:00.000Z")
 * @returns Formatted local time string without timezone
 */
export const formatLocalTimeClean = (utcDateString: string): string => {
  try {
    const date = new Date(utcDateString);
    
    if (isNaN(date.getTime())) {
      return "-";
    }

    // Format as local time without timezone info
    return date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
      timeZone: "UTC"
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "-";
  }
};
