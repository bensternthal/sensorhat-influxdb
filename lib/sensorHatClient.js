require('dotenv').config();

const nodeimu = require('nodeimu');
const IMU = new nodeimu.IMU();
const led = require('sense-hat-led');
let senseHatJSON = {};

exports.getSenseHatJSON = function() {
    return new Promise(function(resolve, reject) {
        IMU.getValue((e, data) => {
            if (data.temperature && data.pressure && data.humidity) {
                // temperature
                senseHatJSON['current_temperature'] = data.temperature;

                // humidity
                senseHatJSON['current_humidity'] = data.humidity;
                // data.pressure.toFixed(4), );
                resolve(senseHatJSON);
            } else {
                return reject('Error reading data from Sense Hat');
            }
        });
    });
};

exports.updateLed = function() {

};

exports.clearLED = function() {
    led.sync.clear();
};
