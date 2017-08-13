'use strict';

require('dotenv').config();

const Hat = require('./lib/sensorHatClient');
const Influx = require('./lib/influx');
const SlackBot = require('slackbots');

const Delay = process.env.UPDATE_FREQUENCY

// Create & Configure Slackbot
let bot = new SlackBot({
    token: process.env.SLACK_API_TOKEN,
    name: process.env.SLACK_BOT_NAME,
});
let channel = process.env.SLACK_CHANNEL;
let params = {icon_emoji: ':tfws:'};

//bot.postMessageToGroup(channel, 'Living Room Has Started', params);

// function getData()
//     Hat.getHatData().then(Influx.writeInflux).then(function() {
//         setTimeout(getData, Delay);
//     }).catch(function(e) {
//         bot.postMessageToGroup(channel,  e.message);
//         // Retry
//         setTimeout(getData, Delay);
//     });
//
// };
//
// getData();

 let foo = getSenseHatJSON();
 console.log(foo);
