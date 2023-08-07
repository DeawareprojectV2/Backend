const deviceWTG = require('./deviceWTG');

const wtgDeviceData = async () => {
    console.log('parsedDataLS:', deviceWTG);

    return deviceWTG;
}

module.exports = wtgDeviceData;