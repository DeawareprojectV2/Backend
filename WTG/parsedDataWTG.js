const Papa = require('papaparse');
const fs = require('fs');

const filePathWTG = './Data/piezo_data.csv';
const csvData = fs.readFileSync(filePathWTG, 'utf-8');
const parsedDataWTG = Papa.parse(csvData, { header: true }).data;

module.exports = parsedDataWTG;

// const pool = require('../pool');
// const query = `SELECT *
//                  FROM iot64_piezometer_data
//                  WHERE DATE_TRUNC('day', timestamp) >= (SELECT MAX(DATE_TRUNC('day', timestamp)) FROM iot64_piezometer_data) - INTERVAL '14 days'
//                  AND DATE_TRUNC('day', timestamp) <= (SELECT MAX(DATE_TRUNC('day', timestamp)) FROM iot64_piezometer_data);` // Change this query to match your PostgreSQL schema
// // const { rowsWTG } = await pool.query(query);

// module.exports rowsWTG;