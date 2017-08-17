require('dotenv').config();

const nodeimu = require('nodeimu');
const IMU = new nodeimu.IMU();
const led = require('sense-hat-led');
let senseHatJSON = {};

let b = [0, 0, 255];
let r = [255, 0, 0];
let e = [0, 0, 0];

let arrowUp = [
    e, e, e, r, r, e, e, e,
    e, e, r, r, r, r, e, e,
    e, r, e, r, r, e, r, e,
    r, e, e, r, r, e, e, r,
    e, e, e, r, r, e, e, e,
    e, e, e, r, r, e, e, e,
    e, e, e, r, r, e, e, e,
    e, e, e, r, r, e, e, e,
];

let arrowDown = [
    e, e, e, b, b, e, e, e,
    e, e, e, b, b, e, e, e,
    e, e, e, b, b, e, e, e,
    e, e, e, b, b, e, e, e,
    b, e, e, b, b, e, e, b,
    e, b, e, b, b, e, b, e,
    e, e, b, b, b, b, e, e,
    e, e, e, b, b, e, e, e,
];

let bars = [
    e, e, e, e, e, e, e, e,
    e, e, e, e, e, e, e, e,
    r, r, r, r, r, r, r, r,
    r, r, r, r, r, r, r, r,
    b, b, b, b, b, b, b, b,
    b, b, b, b, b, b, b, b,
    e, e, e, e, e, e, e, e,
    e, e, e, e, e, e, e, e,
];

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
    // Set night mode
    led.lowLight = true;

    // Set rotation
    led.setRotation(270);

    // Assemble message!
    let msg = 'Temp: ' + senseHatJSON['current_temperature'].toFixed(1) + 'C';
    // do color depending on temperature
    // store temperature and maybe display arrow depending on trend.
    led.showMessage(msg, .1, b, led.clear);
};

exports.clearLED = function() {
    led.clear();
};
