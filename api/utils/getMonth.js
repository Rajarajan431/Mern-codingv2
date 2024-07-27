// utils.js
export function getMonthNumberFromName(monthName) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  
    return monthNames.indexOf(monthName) + 1;
  }