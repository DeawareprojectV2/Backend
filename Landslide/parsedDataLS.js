const Papa = require('papaparse');
const fs = require('fs');

const filePathLS = './Data/datatest1.csv';
const csvData = fs.readFileSync(filePathLS, 'utf-8');
const parsedDataLS = Papa.parse(csvData, { header: true }).data;

module.exports = parsedDataLS;

// const pool = require('../pool');
// const query = `SELECT *
//                 FROM iot64_landslide_data
//                 WHERE DATE_TRUNC('day', timestamp) >= (SELECT MAX(DATE_TRUNC('day', timestamp)) FROM iot64_landslide_data) - INTERVAL '14 days'
//                 AND DATE_TRUNC('day', timestamp) <= (SELECT MAX(DATE_TRUNC('day', timestamp)) FROM iot64_landslide_data);`

// const rowsLS = async () => {
//     const { rows } = await pool.query(query);
//     return rows;
// };

// module.exports = rowsLS;
