require('dotenv').config();

const senseHat = require('node-sense-hat');
const imu = senseHat.Imu;
const IMU = new imu.IMU();
let senseHatJSON = {};

exports.getSenseHatJSON = function() {
    return new Promise(function(resolve, reject) {
        IMU.getValue((e, data) => {
            if (data.temperature && data.pressure && data.humidity) {
                // temperature
                senseHatJSON['current_temperature'] = data.temperature.toFixed();

                // humidity
                senseHatJSON['current_humidity'] = data.humidity.toFixed();
                // data.pressure.toFixed(4), );
                resolve(senseHatJSON);
            } else {
                return reject('Error reading data from Sense Hat');
            }
        });
    });
};
