const Papa = require('papaparse');
const fs = require('fs');

const filePathWTG = './Data/device_idWTG.csv';
const csvData = fs.readFileSync(filePathWTG, 'utf-8');
const deviceWTG = Papa.parse(csvData, { header: true }).data;

module.exports = deviceWTG