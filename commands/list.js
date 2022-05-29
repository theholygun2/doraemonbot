const { Permissions, MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {

    const guildId = message.guild.id;
    const meetLink = 'https://meet.google.com/qbk-gwnw-ecu'
    const absenLink = 'https://elearning.pnj.ac.id/course/view.php?id=10774'
    let imageBaseUrl = 'https://cdn.discordapp.com/avatars/'
    let userAvatarPath = `${client.user.id}/${client.user.avatar}`


    const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('[List of Classes]')
    .setAuthor({ name: `${client.user.username}`, iconURL: `${imageBaseUrl}/${userAvatarPath}.jpg`})
    .setDescription(`<@&968078434817409054> Your Class Links: `)
    .setThumbnail(`${imageBaseUrl}/${userAvatarPath}.jpg`)
    .addFields(
		    { name: 'shell', value: 'https://elearning.pnj.ac.id/course/view.php?id=10774'},
        { name: 'Link', value: 'https://meet.google.com/qbk-gwnw-ecu'},
        { name: 'pm', value: 'https://elearning.pnj.ac.id/course/view.php?id=10777' },
        { name: 'eng', value: 'https://elearning.pnj.ac.id/course/view.php?id=10780' },
        { name: 'proj', value: 'https://elearning.pnj.ac.id/course/view.php?id=10782' },
        { name: 'dist', value: 'https://elearning.pnj.ac.id/course/view.php?id=10779' },
        { name: 'java', value: 'https://elearning.pnj.ac.id/course/view.php?id=10776' },
        { name: 'security', value: 'https://elearning.pnj.ac.id/course/view.php?id=10778' },
        { name: 'crypto', value: 'https://classroom.google.com/u/0/c/NDgyNTYwNTQ5NzM1' },
        { name: 'mikrotik', value: 'https://elearning.pnj.ac.id/course/view.php?id=10775' },
	)
	.setTimestamp()

    message.channel.send({ embeds: [exampleEmbed]});
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['t'],
    permLevel: "User"
  };

  exports.help = {
    name: "list",
    category: "Timer",
    description: "List of classes",
    usage: "~list"
  };