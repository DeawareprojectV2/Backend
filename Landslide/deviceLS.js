const Papa = require('papaparse');
const fs = require('fs');

const filePathLS = './Data/device_idLS.csv';
const csvData = fs.readFileSync(filePathLS, 'utf-8');
const deviceLS = Papa.parse(csvData, { header: true }).data;

module.exports = deviceLS
