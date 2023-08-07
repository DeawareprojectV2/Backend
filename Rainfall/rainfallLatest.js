const Papa = require('papaparse');
const fs = require('fs');


const rainfallLatest = async () => {
    
    const filePathRF2 = './Data/wtele_rain_station.csv';
    
    const csvData2 = fs.readFileSync(filePathRF2, 'utf-8');

    const parsedDataRF2 = Papa.parse(csvData2, { header: true }).data;

    const filePathRF = './Data/wtele_rain_15min.csv';
    const csvData = fs.readFileSync(filePathRF, 'utf-8');
    const parsedDataRF = Papa.parse(csvData, { header: true }).data;

    const filterDataRF1 = parsedDataRF.reduce((accumulator, currentValue) => {
        const { station_id, timestamp } = currentValue;
  
        const existingData = accumulator.find(item => item.station_id === station_id);
  
        if (existingData) {
            if (new Date(timestamp) > new Date(existingData.timestamp)) {
                existingData.timestamp = timestamp;
            }
        }else {
            accumulator.push(currentValue);
        }
  
        return accumulator
    }, []);
  
      const matchedData = filterDataRF1.map((item) => {
          const stationId = item.station_id;
          if (stationId in parsedDataRF2) {
            return {
              ...item,
              type: 'Rainfall',
              latitude: parsedDataRF2[stationId].latitude,
              longitude: parsedDataRF2[stationId].longitude,
            }
          }
          return item; 
      })
    return matchedData;
}

module.exports = rainfallLatest;