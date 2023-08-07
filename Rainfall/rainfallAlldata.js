const parsedDataRF = require("./parsedDataRF");
const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0"); // ใส่เลขวันให้เป็นสองหลักและใส่เลข 0 ถ้าเป็นเลขเดียว
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // เดือนเริ่มจาก 0 ดังนั้นต้องบวก 1
  const year = date.getFullYear(); // ปี
  return `${year}-${month}-${day}`;
};
const rainfallAlldata = async (station_id) => {
  const time = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];
  const hourRaindata = [];

  const rainfallFilterdata = parsedDataRF.filter(
    (item) => item.station_id === station_id
  );
  const parsedData = rainfallFilterdata.map((item) => ({
    timestamps: item.timestamp,
    rainData: parseInt(item.rain_data),
  }));

  const timestamps = parsedData.map(
    (item) => new Date(item.timestamps.split(" ")[0])
  ); // แปลง timestamp string ให้เป็นวันที่แบบ Date (ไม่รวมเวลา)
  const minTimestamp = new Date(Math.min(...timestamps)); // แปลงกลับเป็น Date
  const maxTimestamp = new Date(Math.max(...timestamps)); // แปลงกลับเป็น Date
  const startDateFormatted = formatDate(minTimestamp); // แปลงวันที่เป็นรูปแบบ "DD-MM-YYYY"
  const endDateFormatted = formatDate(maxTimestamp); // แปลงวันที่เป็นรูปแบบ "DD-MM-YYYY"

  const startDate = new Date(startDateFormatted);
  const endDate = new Date(endDateFormatted);
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {

    for (i = 0; i <= time.length; i++) {
      const rainfallTime = rainfallFilterdata.filter(
        (item) =>
          item.timestamp.substring(11, 13) === time[i] && item.timestamp.substring(0, 10) === date.toISOString().substring(0, 10)
      );
      const rainfallaverage = rainfallTime.map((item) => ({
        rainData: parseInt(item.rain_data),
      }));
      const average = Object.values(rainfallaverage);

      let sum = 0;
      if (average.length > 0) {
        for (const obj of average) {
          sum += obj.rainData;
        }
        sum = sum / average.length;
        hourRaindata.push(sum);
      } else {
        hourRaindata.push(0);
      } 

    }
  }
  const rainfallmapdata = rainfallFilterdata.map((item) => ({
    station_id: item.station_id,
    rain_data: item.rain_data,
  }));

  return hourRaindata;
};

module.exports = rainfallAlldata;
