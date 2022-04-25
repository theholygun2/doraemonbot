const schedule = require('node-schedule');
const moment = require('moment-timezone');
const parseDateString = require('../modules/utils/parseDateString.js')
const { settings } = require("../modules/settings.js");
const { Permissions, MessageEmbed } = require("discord.js");

exports.run = (client, message, args, level) => {

    console.log(settings)

    const [timerValue, timerDescription] = (args); //tv=15s td=andi

    const timerDate = parseDateString(timerValue);
    const DATE_FORMAT = process.env.DATE_FORMAT || 'DD/MM/YY hh:mm A Z';
    const TimerMetaData = require('../modules/timeObj/TimerMetaData');
    const getNextAvailableJobId = require('../modules/utils/getNextAvailableJobId');
    const timerMetaDataRepository = require('../modules/timeObj/TimerMetaDataRepository');

    const guildId = message.guild.id;
    const meetLink = 'https://meet.google.com/qbk-gwnw-ecu'
    const absenLink = 'https://elearning.pnj.ac.id/course/view.php?id=10774'
    let imageBaseUrl = 'https://cdn.discordapp.com'
    let userAvatarPath = `avatars/${client.user.id}/${client.user.avatar}`

    const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('[TIMER REMINDER]')
    .setAuthor({ name: `${client.user.username}`, iconURL: `${imageBaseUrl}/${userAvatarPath}.jpg`})
    .setDescription(`<@&968078434817409054> Your Class Links: `)
    .setThumbnail(`${imageBaseUrl}/${userAvatarPath}.jpg`)
    .addFields(
		{ name: 'Google Meet Link: ', value: meetLink },
    { name: 'Absen Link: ', value: absenLink },
		{ name: '\u200B', value: '\u200B' },
	)
	.setTimestamp()



    if (timerValue === 'status') {
      const timeZone = 'Asia/Jakarta';
      return message.channel.send(buildScheduledJobsTable(timerMetaDataRepository.getAllTimerMetadata(guildId),timeZone));
    };

    if (timerDate !== null) {
        const jobId = getNextAvailableJobId();
        const scheduledJob = schedule.scheduleJob(timerDate, function () {
            const channelToSend = client.channels.cache.get(message.channel.id);
            if (channelToSend) {
              
                channelToSend.send({ embeds: [exampleEmbed]});
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
    }
     else {
        message.channel.send('Unable to parse the date string.');
    } 
  };
  
/**
 *
 * @param {TimerMetaData[]} timerObjects
 * @param {string} timeZone
 * @return {string}
 */
 function buildScheduledJobsTable(timerObjects,timeZone) {
	if (timerObjects.length === 0) {
		return "There are no active timers scheduled.";
	}

	timerObjects = timerObjects.sort(function(a,b) {
		return a.getDate() - b.getDate();
	});

	let str = 'Active timers:\n```\n';
	for(let i=0;i<timerObjects.length;i++) {
		const timerObject = timerObjects[i];
		const scheduledJob = timerObject.scheduledJob;
		str += moment(scheduledJob.nextInvocation().toISOString()).tz(timeZone).format('DD/MM/YY hh:mm A Z') + '\t @' + timerObject.getUserOrRoleToNotify() + '\t' + (timerObject.getDescription() ? timerObject.getDescription() : '(no description provided)') + '\n';
	}
	str = str.trim();
	str += '```';
	return str;
}

  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['t'],
    permLevel: "Bot Admin"
  };

  exports.help = {
    name: "timer",
    category: "Timer",
    description: "Set up a timer that will notify your class role in the guild text channel",
    usage: "[command] <[hh:mm:ss] or [status]> [note] ex: ~timer 5m Minum or ~timer status"
  };

  