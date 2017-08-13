'option strict';

var util = require('util');
var nest = require('unofficial-nest-api');
var conf = require('./conf');

var username = conf.get('nest_username');
var password = conf.get('nest_password');
var device = conf.get('nest_id');
var nestJSON = {};

exports.getNestData = function() {

    return new Promise(function(resolve, reject) {

        nest.login(username, password, function(err, data) {
            if (err) {
                return reject(new Error(err));
            }
            nest.fetchStatus(function(data) {
                if (!data.hasOwnProperty('device') || !data.device.hasOwnProperty(device)) {
                    return reject(Error('Could not find device with the id "' + device + '"'));
                }

                if (!data.hasOwnProperty('shared') || !data.shared.hasOwnProperty(device)) {
                    return reject(Error('Could not find shared device wih the id "' + device + '"'));
                }

                // temperature
                nestJSON['current_temperature'] = data.shared[device].current_temperature;

                // humidity
                nestJSON['current_humidity'] = data.device[device].current_humidity;

                // is heater on?
                if(data.shared[device].hvac_heater_state) {
                    nestJSON['heater_on'] = 1;
                } else {
                    nestJSON['heater_on'] = 0;
                }

                resolve(nestJSON);
            });
        });

    });
};
