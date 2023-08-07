const parsedDataLS = require('./parsedDataLS');

const landslideLatest = parsedDataLS.reduce((accumulator, currentValue) => {
  const { device_id, timestamp } = currentValue;
  const existingData = accumulator.find((item) => item.device_id === device_id);
  if (existingData) {
    if (new Date(timestamp) > new Date(existingData.timestamp)) {
      existingData.timestamp = timestamp;
    }
  } else {
    accumulator.push(currentValue);
  }
  return accumulator;
}, []);

module.exports = landslideLatest;