'use strict';

/* Influx! */
var influx = require('influx');
var conf = require('./conf');

var client = influx({
    // or single-host configuration
    host: conf.get('influx_host'),
    port: conf.get('influx_port'),
    protocol: 'http',
    username: conf.get('influx_username'),
    password: conf.get('influx_password'),
    database: conf.get('influx_db')
});

exports.writeInflux = function(nestData) {

    return new Promise(function(resolve, reject) {
        var points = [
            [{
                'temperature': nestData.current_temperature
            }, {
                location: 'livingroom'
            }],
            [{
                'humidity': nestData.current_humidity
            }, {
                location: 'livingroom'
            }],
            [{
                'heater_on': nestData.heater_on
            }, {
                location: 'livingroom'
            }]
        ];

        client.writePoints('weather', points, function(err, response) {
            if (err) {
                reject(new Error(err));
            }
            else {
                resolve();
            }
        });

    });
};
