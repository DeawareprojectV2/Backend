const parsedDataLS = require('./parsedDataLS')

const processLandslideLatest14Days = (landslideLatest, parsedDataLS) => {
  const filteredTimestamps = landslideLatest.map((item) => {
      const timestamp = new Date(item.timestamp);
      timestamp.setDate(timestamp.getDate() - 14);
      return {
          device_id: item.device_id,
          timestamp: timestamp.toISOString().slice(0, 19).replace("T", " ").split(" ")[0]
      };
  });

  const filteredCSVData = filteredTimestamps.flatMap((filteredItem) => {
      const matchingData = parsedDataLS.filter((item) => {
          return (
              item.device_id === filteredItem.device_id &&
              item.timestamp.split(" ")[0] === filteredItem.timestamp
          );
      });
      return matchingData;
  });

  const filtered = filteredCSVData.reduce((accumulator, currentValue) => {
      const existingData = accumulator.find((item) => item.device_id === currentValue.device_id);
      if (!existingData) {
          return [...accumulator, currentValue];
      }

      const existingTimestamp = new Date(existingData.timestamp);
      const currentTimestamp = new Date(currentValue.timestamp);

      if (currentTimestamp > existingTimestamp) {
          return [
              ...accumulator.filter((item) => item.device_id !== currentValue.device_id),
              currentValue,
          ];
      }
      return accumulator;
  }, []);

  const filteredWithType = filtered.map(item => ({ ...item, type: 'Landslide' }));
  const filterLandslideData1WithType = landslideLatest.map(item => ({ ...item, type: 'Landslide' }));

  const combinedData = [...filterLandslideData1WithType, ...filteredWithType];

  const deviceCounts = {};
  for (const item of combinedData) {
      if (deviceCounts[item.device_id]) {
          deviceCounts[item.device_id]++;
      } else {
          deviceCounts[item.device_id] = 1;
      }
  }

  const finalResult = combinedData.filter(item => deviceCounts[item.device_id] >= 2);

  return finalResult;
}

const landslideLatest14Days = (landslideLatest) => {
  return processLandslideLatest14Days(landslideLatest, parsedDataLS);
}

module.exports = landslideLatest14Days;