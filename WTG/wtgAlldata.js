const parsedDataWTG = require("./parsedDataWTG");

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0"); // ใส่เลขวันให้เป็นสองหลักและใส่เลข 0 ถ้าเป็นเลขเดียว
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // เดือนเริ่มจาก 0 ดังนั้นต้องบวก 1
  const year = date.getFullYear(); // ปี
  return `${year}-${month}-${day}`;
};
const wtgAlldata = async (device_id) => {
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
  const hourWtgdata = [];

  const day = [
    "2022-10-30",
    "2022-11-01",
    "2022-11-02",
    "2022-11-03",
    "2022-11-04",
    "2022-11-05",
    "2022-11-06",
    "2022-11-07",
    "2022-11-08",
    "2022-11-09",
    "2022-11-10",
    "2022-11-11",
    "2022-11-12",
    "2022-11-13",
    "2022-11-14",
  ];

  const wtgFilterdata = parsedDataWTG.filter(
    (item) =>
      item.device_id === device_id && day.includes((item.timestamp.split(" ")[0]))
  );
  console.log(wtgFilterdata);
  const parsedData = wtgFilterdata.map((item) => ({
    timestamps: item.timestamp,
    piezoData: parseFloat(item.kpa),
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
      const wtgTime = wtgFilterdata.filter(
        (item) =>
          item.timestamp.substring(11, 13) === time[i] &&
          item.timestamp.substring(0, 10) ===
            date.toISOString().substring(0, 10)
      );
      const wtgaverage = wtgTime.map((item) => ({
        wtgData: parseFloat(item.kpa),
      }));
      const average = Object.values(wtgaverage);

      let sum = 0;
      if (average.length > 0) {
        for (const obj of average) {
          if(sum <obj.wtgData){
            sum = obj.wtgData;
          }
          
        }

        hourWtgdata.push(sum);
      } else {
        hourWtgdata.push(0);
      }
    }
  }

  return hourWtgdata;
};

module.exports = wtgAlldata;
