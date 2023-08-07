const express = require('express');
const cors = require('cors')

const landslideAlldata = require('./Landslide/landslideAlldata')
const rainfallLatest = require('./Rainfall/rainfallLatest')
const wtgLatest = require('./WTG/wtgLatest')
const landslideLatest = require('./Landslide/landslideLatest');
const landslideLatest14Days = require('./Landslide/landslideLatest14Days');
const rainfallAlldata = require('./Rainfall/rainfallAlldata');
const wtgAlldata = require('./WTG/wtgAlldata');
const landslideDeviceData = require('./Landslide/landslideDeviceData');
const wtgDeviceData = require('./WTG/wtgDeviceData');

const app = express();

app.use(cors())

const updateInterval = 30 * 60 * 1000; // 30 นาทีในหน่วยมิลลิวินาที
setInterval(async () => {
  try {
    await landslideAlldata(); // อัพเดทข้อมูลเซ็นเซอร์แบบ landslide
    await rainfallLatest(); // อัพเดทข้อมูลฝนล่าสุด
    await wtgLatest(); // อัพเดทข้อมูลเซ็นเซอร์แบบ water ground pressure
    // ... call other update functions ...
  } catch (error) {
    console.error('Error updating data:', error);
  }
}, updateInterval);

// -- query ได้เลย --
app.get('/api/landslide/landslideAlldata/:device_id', async (req, res) => {
  try {
    const device_id = req.params.device_id;
    const landslideData = await landslideAlldata(device_id);
    
    // เลือกข้อมูลที่ต้องการในรูปแบบของ dailyChartData
    const filteredData = landslideData.filter(item => item[0] === device_id);
    
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching landslide data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

//Marker
// -- query ได้เลย -- 
app.get('/api/landslide/landslideLatest', async (req,res) => {
  try {
    const landslideLatestData = await landslideLatest; // รอให้ฟังก์ชัน landslideAlldata เสร็จสิ้นก่อน
    res.json(landslideLatestData);
  } catch (error) {
    console.error('Error fetching landslide data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
})

//Animation Marker
// ** ต้อง filter ก่อน **
app.get('/api/landslide/landslideLatest14Days', async (req, res) => {
  try {
    const landslideLatest14Data = await landslideLatest14Days(landslideLatest); // รอให้ฟังก์ชัน landslideAlldata เสร็จสิ้นก่อน
    res.json(landslideLatest14Data);
  } catch (error) {
    console.error('Error fetching landslide data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
})

// -- query ได้เลย --
app.get('/api/rainfall/rainfallAlldata/:station_id', async (req, res) => {
  try {
    const station_id = req.params.station_id;
    const rainfallData = await rainfallAlldata(station_id); // รอให้ฟังก์ชัน rainfallAlldata เสร็จสิ้นก่อน

    res.json(rainfallData);
  } catch (error) {
    console.error('Error fetching rainfall data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// -- filter --
app.get('/api/rainfall/rainfallLatest', async (req, res) => {
  try {
    const rainfallLatestData = await rainfallLatest(); // รอให้ฟังก์ชัน rainfallAlldata เสร็จสิ้นก่อน
    res.json(rainfallLatestData);
  } catch (error) {
    console.error('Error fetching rainfall data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
})

// -- query ได้เลย --
app.get('/api/wtg/wtgAlldata/:device_id', async (req, res) => {
  try {
    const device_id = req.params.device_id;
    const wtgData = await wtgAlldata(device_id); // รอให้ฟังก์ชัน wtgAlldata เสร็จสิ้นก่อน

    res.json(wtgData);

  } catch (error) {
    console.error('Error fetching wtg data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// -- filter --
app.get('/api/wtg/wtgLatest', async (req, res) => {
  try{
    const wtgLatestData = await wtgLatest(); // รอให้ฟังก์ชัน wtgAlldata เสร็จสิ้นก่อน
    res.json(wtgLatestData);
  } catch (error) {
    console.error('Error fetching water ground pressure data:', error)
    res.status(500).json({ error: 'An error occurred while fetching data.' })
  }
})

app.get('/api/landslide/device_idLS', async (req, res) => {
  try{
    const landslideId = await landslideDeviceData();
    res.json(landslideId);
  } catch (error) {
    console.error('Error fetching landslide device_id data', error)
    res.status(500).json({ error: 'An error occurred while fetching data.' })
  }
})

app.get('/api/wtg/device_idWTG', async (req, res) => {
  try{
    const wtgId = await wtgDeviceData();
    res.json(wtgId);
  } catch (error) {
    console.error('Error fetching landslide device_id data', error)
    res.status(500).json({ error: 'An error occurred while fetching data.' })
  }
})

// เริ่มต้นเซิร์ฟเวอร์ที่พอร์ต 8080
app.listen(8080, () => {
  console.log('Server started on http://localhost:8080');
});