const schedule = require('node-schedule');
const moment = require('moment-timezone');
const parseDateString = require('../modules/utils/parseDateString.js')
const { MessageEmbed, Formatters } = require("discord.js");
const {Users, Courses} = require("../dbObjects")
const { Op } = require("sequelize")

exports.run =  async (client, message, [subject, timerValue, timerDescription, ...af]) => {

    // const [subject, timerValue, timerDescription] = (args);
    const timeZone = 'Asia/Jakarta';

    const user = message.author
    const timerDate = parseDateString(timerValue);
    const DATE_FORMAT = process.env.DATE_FORMAT || 'DD/MM/YY hh:mm A Z';
    const TimerMetaData = require('../modules/timeObj/TimerMetaData');
    const getNextAvailableJobId = require('../modules/utils/getNextAvailableJobId');
    const timerMetaDataRepository = require('../modules/timeObj/TimerMetaDataRepository');
    const guildId = message.guild.id;
    let userAvatarPath = `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}`

    if (subject === 'status') {
      return message.channel.send(buildScheduledJobsTable(timerMetaDataRepository.getAllTimerMetadata(guildId),timeZone));
    };
    
    const db_user = await Users.findOne({where: { user_id: user.id}})
    if(!db_user) return
    const cours = await Courses.findOne({where: {user_id: user.id, name: {[Op.like]: subject}}})
    if(!cours) return

    const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('[TIMER REMINDER]')
    .setAuthor({ name: `${client.user.username}`, iconURL: `${userAvatarPath}.jpg`})
    .setDescription(`<@${user.id}> Your Class Links: `)
    .setThumbnail(`${userAvatarPath}.jpg`)
    .addFields(
    { name: 'Absen Link: ', value: Formatters.hyperlink(`${cours.name}`, `${cours.link}`, `${cours.link}`) },
		{ name: '\u200B', value: '\u200B' },
	)
	.setTimestamp()


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
        timerMetaData.setUserOrRoleToNotify(user.username);
        timerMetaData.setUserOrRoleIdToNotify(user.id);
        timerMetaData.setScheduledJob(scheduledJob);

        timerMetaDataRepository.addTimerMetadata(guildId, timerMetaData);
        const timeZone = 'Asia/Jakarta';
        message.channel.send('Timer scheduled for ' + moment(scheduledJob.nextInvocation().toISOString()).tz(timeZone).format(DATE_FORMAT) + '.');
    }
     else {
        message.channel.send('Unable to parse the date string. please us 4h/5m/4s');
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
    enabled: false,
    guildOnly: true,
    aliases: ['t'],
    permLevel: "User"
  };

  exports.help = {
    name: "timer",
    category: "Cours",
    description: "(BETA)Notify absen| cara pakai: ~t <subject> 1h15s",
    usage: "[command] <[hh:mm:ss] or [status]> [note] ex: ~timer 5m Minum or ~timer status"
  };

  