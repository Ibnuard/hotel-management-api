const moment = require("moment");
require("moment/locale/id");
moment.locale("id");

function extractNumberFromCurrency(currencyString) {
  // Remove currency symbols and any non-numeric characters except for the dot
  const numericString = currencyString.replace(/[^0-9.,]/g, "");

  // Remove dots (or commas if they are used as decimal points in the locale)
  const sanitizedString = numericString.replace(/\./g, "");

  // Convert the sanitized string to a number
  return parseInt(sanitizedString, 10);
}

function calculateDateDifference(startDate, endDate) {
  // Parse the dates using moment
  const start = moment(startDate, "YYYY-MM-DD");
  const end = moment(endDate, "YYYY-MM-DD");

  // Calculate the difference in days
  const differenceInDays = end.diff(start, "days");

  return differenceInDays;
}

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    return total + item.total_price; // Menambahkan total_price setiap item ke total
  }, 0); // Inisialisasi total dengan 0
};

module.exports = {
  extractNumberFromCurrency,
  calculateDateDifference,
  calculateTotalPrice,
};
