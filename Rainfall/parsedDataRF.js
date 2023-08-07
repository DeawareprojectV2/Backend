const Papa = require('papaparse');
const fs = require('fs');


const filePathRF = './Data/wtele_rain_15min.csv';
const csvData = fs.readFileSync(filePathRF, 'utf-8');
const parsedDataRF = Papa.parse(csvData, { header: true }).data;
module.exports = parsedDataRF;

// const pool = require('../pool');
// const query = `SELECT station_id, timestamp, rain_data
//                 FROM wtele_rain_15min
//                 WHERE DATE_TRUNC('day', timestamp) >= (SELECT MAX(DATE_TRUNC('day', timestamp)) FROM wtele_rain_15min) - INTERVAL '14 days'
//                 AND DATE_TRUNC('day', timestamp) <= (SELECT MAX(DATE_TRUNC('day', timestamp)) FROM wtele_rain_15min);` // Change this query to match your PostgreSQL schema
// const { rowsRF } = await pool.query(query);

// module.exports rowsRF;

// const formatDate = (date) => {
//     const day = date.getDate().toString().padStart(2, '0'); // ใส่เลขวันให้เป็นสองหลักและใส่เลข 0 ถ้าเป็นเลขเดียว
//     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // เดือนเริ่มจาก 0 ดังนั้นต้องบวก 1
//     const year = date.getFullYear(); // ปี
//     return `${day}-${month}-${year}`;
//   };

// const timestamps = parsedData.map(item => new Date(item.x.split(' ')[0])); // แปลง timestamp string ให้เป็นวันที่แบบ Date (ไม่รวมเวลา)
//         const minTimestamp = new Date(Math.min(...timestamps)); // แปลงกลับเป็น Date
//         const maxTimestamp = new Date(Math.max(...timestamps)); // แปลงกลับเป็น Date

//         const startDateFormatted = formatDate(minTimestamp); // แปลงวันที่เป็นรูปแบบ "DD-MM-YYYY"
//         const endDateFormatted = formatDate(maxTimestamp); // แปลงวันที่เป็นรูปแบบ "DD-MM-YYYY"

//         console.log('min', startDateFormatted);
//         console.log('max', endDateFormatted);
//         const startDate = new Date('07-06-2022 ');
//         const endDate = new Date('21-06-2022 ');