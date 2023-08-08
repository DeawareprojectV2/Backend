# Backend

## Introduction

- Backend mock up API server ที่ใช้ข้อมูลจาก CSV file เพื่อสร้าง backend ที่ทำงานอยู่บน localhost:8080

## Path

- /api/landslide/landslideAlldata/:device_id ใช้สำหรับข้อมูลของ Graph เป็นข้อมูลทั้งหมด 14 วันล่าสุดของ Device_id ที่เลือก

- /api/landslide/landslideLatest ใช้สำหรับ Marker Landslide เป็นข้อมูลล่าสุดของแต่ละ Marker Landslide

- /api/landslide/landslideLatest14Days ใช้สำหรับ Animation Marker เป็นข้อมูลล่าสุด และ 14 วันย้อนหลัง(เฉพาะวันที่ 14 ย้อนหลังจากวันที่ล่าสุด)

- /api/rainfall/rainfallAlldata/:station_id ใช้สำหรับข้อมูลของ Graph เป็นข้อมูลทั้งหมด 14 วันล่าสุดของ Station_id ที่เลือก

- /api/rainfall/rainfallLatest ใช้สำหรับ Marker Rainfall เป็นข้อมูลล่าสุดของแต่ละ Marker Rainfall

- /api/wtg/wtgAlldata/:device_id ใช้สำหรับข้อมูลของ Graph เป็นข้อมูลทั้งหมด 14 วันล่าสุดของ Device_id ที่เลือก

- /api/wtg/wtgLatest ใช้สำหรับ Marker WTG เป็นข้อมูลล่าสุดของแต่ละ Marker WTG

- /api/landslide/device_idLS ใช้สำหรับตรวจสอบ Sensor status ทั้งหมดของ Landslide sensor

- /api/landslide/device_idWTG ใช้สำหรับตรวจสอบ Sensor status ทั้งหมดของ WTG sensor

## Getting Started

- Clone repository โดยใช้คำสั่ง: git clone https://github.com/DeawareprojectV2/Backend.git

- เข้าไปยังโฟลเดอร์โปรเจกต์

- เปิดเทอร์มินัลและพิมพ์คำสั่ง: node .