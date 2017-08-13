'use strict';

require('dotenv').config();

const Conf = require('./lib/conf');
const Hat = require('./lib/sensorHatClient');
const Influx = require('./lib/influx');
const SlackBot = require('slackbots');

const Delay = process.env.UPDATE_FREQUENCY

// Create & Configure Slackbot
var bot = new SlackBot({
    token: conf.get('slackbot:api_token'),
    name: 'nest-status'
});
var channel = conf.get('slackbot:channel');
var params = {icon_emoji: ':nest:'};

//bot.postMessageToGroup(channel, 'Nest Has Started', params);

function getData() {

    Hat.getHatData().then(Influx.writeInflux).then(function() {
        setTimeout(getData, Delay);
    }).catch(function(e) {
        bot.postMessageToGroup(channel,  e.message);
        // Retry
        setTimeout(getData, Delay);
    });

};

getData();
