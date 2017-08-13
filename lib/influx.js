'use strict';
require('dotenv').config();
const influx = require('influx');

let client = influx({
    host: process.env.INFLUX_HOST,
    port: process.env.INFLUX_PORT,
    protocol: 'https',
    username: process.env.INFLUX_USERNAME,
    password: process.env.INFLUX_PASSWORD,
    database: process.env.INFLUX_DB,
});

exports.writeInflux = function(sensorHatJson) {
    return new Promise(function(resolve, reject) {
        let points = [
            [{
                'temperature': sensorHatJson.current_temperature,
            }, {
                location: 'livingroom',
            }],
            [{
                'humidity': sensorHatJson.current_humidity,
            }, {
                location: 'livingroom',
            }],
        ];

        client.writePoints('weather', points, function(err, response) {
            if (err) {
                reject(new Error(err));
            } else {
                resolve();
            }
        });
    });
};
