// utils/dateUtils.js

/**
 * Formats a date to dd/mm/yyyy format
 * @param {Date|number|null} date- Date object, timestamp, or null
 * @returns {string}
 */
export const formatDateToDDMMYYYY = (date) => {
  if (!date) return '';
  
  let dateObj;
  if (typeof date === 'number') {
    dateObj = new Date(date);
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    dateObj = new Date();
  }
  
  if (isNaN(dateObj.getTime())) {
    dateObj = new Date();
  }
  
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Gets current date formatted as dd/mm/yyyy
 * @returns {string}
 */
export const getCurrentFormattedDate = () => {
  return formatDateToDDMMYYYY(new Date());
};

/**
 * Converts Firebase ServerValue.TIMESTAMP to formatted date
 * This is used for handling Firebase's server timestamp placeholder
 * @param {any} timestamp
 * @returns {string}
 */
export const handleFirebaseTimestamp = (timestamp) => {
  if (timestamp && typeof timestamp === 'object' && timestamp['.sv'] === 'timestamp') {
    return getCurrentFormattedDate();
  }
  
  if (typeof timestamp === 'number') {
    return formatDateToDDMMYYYY(timestamp);
  }
  
  return getCurrentFormattedDate();
};