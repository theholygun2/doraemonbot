const schedule = require('node-schedule');
const moment = require('moment-timezone');
const parseDateString = require('../modules/utils/parseDateString.js')
const { settings } = require("../modules/settings.js");

exports.run = (client, message, args, level) => {

    console.log(settings)

    const [timerValue, timerDescription] = (args); //tv=15s td=andi
    const timerDate = parseDateString(timerValue);
    const DATE_FORMAT = process.env.DATE_FORMAT || 'DD/MM/YY hh:mm A Z';

    const TimerMetaData = require('../modules/timeObj/TimerMetaData');
    const getNextAvailableJobId = require('../modules/utils/getNextAvailableJobId');
    const timerMetaDataRepository = require('../modules/timeObj/TimerMetaDataRepository');

    const guildId = message.guild.id;

    if (timerDate !== null) {
        const jobId = getNextAvailableJobId();
        const scheduledJob = schedule.scheduleJob(timerDate, function () {
            const channelToSend = client.channels.cache.get(message.channel.id);
            if (channelToSend) {
                channelToSend.send('Reminder <@' + message.author.id + '>: ' + (timerDescription ? timerDescription : '(no description provided)'));
            }
            // Since the job has now executed, we no longer need to keep track of it.
            timerMetaDataRepository.deleteTimerMetadata(guildId, jobId);
        });
        scheduledJob._id = jobId;
        const timerMetaData = new TimerMetaData();
        timerMetaData.setJobId(jobId);
        timerMetaData.setDate(timerDate);
        timerMetaData.setDescription(timerDescription);
        timerMetaData.setUserOrRoleToNotify(message.author.username);
        timerMetaData.setUserOrRoleIdToNotify(message.author.id);
        timerMetaData.setScheduledJob(scheduledJob);

        timerMetaDataRepository.addTimerMetadata(guildId, timerMetaData);
        const timeZone = 'Asia/Jakarta';
        message.channel.send('Timer scheduled for ' + moment(scheduledJob.nextInvocation().toISOString()).tz(timeZone).format(DATE_FORMAT) + '.');
    } else {
        message.channel.send('Unable to parse the date string.');
    } 
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['t'],
    permLevel: "Bot Admin"
  };

  exports.help = {
    name: "timer",
    category: "Timer",
    description: "Set up a timer that will notify you in the guild text channel",
    usage: "[command] [hh:mm:ss] [note] ex: !timer 5m Minum"
  };