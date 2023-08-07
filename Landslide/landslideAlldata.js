// landslideAlldata.js
const parsedDataLS = require("./parsedDataLS");

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0"); // ใส่เลขวันให้เป็นสองหลักและใส่เลข 0 ถ้าเป็นเลขเดียว
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // เดือนเริ่มจาก 0 ดังนั้นต้องบวก 1
  const year = date.getFullYear(); // ปี
  return `${year}-${month}-${day}`;
};

const landslideAlldata = async (device_id) => {
  const filteredData = parsedDataLS.filter(
    (item) => item.device_id === device_id
  );
  const parsedData = filteredData.map((item) => ({
    x: item.timestamp,
    y: parseFloat(item.altitude),
  }));

  const timestamps = parsedData.map((item) => new Date(item.x.split(" ")[0])); // แปลง timestamp string ให้เป็นวันที่แบบ Date (ไม่รวมเวลา)
  const minTimestamp = new Date(Math.min(...timestamps)); // แปลงกลับเป็น Date
  const maxTimestamp = new Date(Math.max(...timestamps)); // แปลงกลับเป็น Date
  const startDateFormatted = formatDate(minTimestamp); // แปลงวันที่เป็นรูปแบบ "DD-MM-YYYY"
  const endDateFormatted = formatDate(maxTimestamp); // แปลงวันที่เป็นรูปแบบ "DD-MM-YYYY"

  const startDate = new Date(startDateFormatted);
  const endDate = new Date(endDateFormatted);

  const dailyChartData = [];

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    if (date <= endDate) {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const formattedDate = date.toLocaleDateString("en-GB", options);
      const filteredChartData = parsedData.filter(
        (item) =>
          item.x.substring(0, 10) === date.toISOString().substring(0, 10)
      );
      const yAxisData = filteredChartData.map((item) => item.y);
 
      const parts = formattedDate.split("/");
      const year = parts[2];
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[0], 10);
      const lastFormattedDate = `${year}/${month}/${day}`;

      if (Math.min(...yAxisData) !== Infinity) {
        dailyChartData.push([
          device_id,
          lastFormattedDate,
          yAxisData[0],
          yAxisData[yAxisData.length - 1],
          Math.min(...yAxisData),
          Math.max(...yAxisData),
        ]);
      }
      for (let i = 1; i <= 23; i++) {
        dailyChartData.push([
          device_id,
          i.toString() + ":00",
          null,
          null,
          null,
          null,
        ]);
      }
    }
  }

  return dailyChartData;
};

module.exports = landslideAlldata;
