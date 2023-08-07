const Papa = require('papaparse');
const fs = require('fs');

const parsedDataWTG = require('./parsedDataWTG')

const wtgLatest = async () => {
  
    const filePathWTG2 = './Data/peizo_data2.csv'
    const csvData2 = fs.readFileSync(filePathWTG2, 'utf-8');
    const parsedDataWTG2 = Papa.parse(csvData2, { header: true }).data;

    const filterDataWTG1 = parsedDataWTG.reduce((accumulator, currentValue) => {
        const { device_id, timestamp } = currentValue;
  
        const existingData = accumulator.find(item => item.device_id === device_id);
  
        if (existingData) {
            if (new Date(timestamp) > new Date(existingData.timestamp)) {
                existingData.timestamp = timestamp;
            }
        }else {
            accumulator.push(currentValue);
        }
  
        return accumulator
    }, []);
  
    const matchedDataWTG = filterDataWTG1.map((item) => {
      const deviceId = item.device_id;
      const matchedStation = parsedDataWTG2.find((station) => station.device_id === deviceId);
          if (matchedStation) {
            return {
              ...item,
              type: 'Peizo',
              latitude: matchedStation.latitude,
              longitude: matchedStation.longitude,
            };
          }
          return item;
        });
    return matchedDataWTG
}

module.exports = wtgLatest;