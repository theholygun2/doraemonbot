const { Permissions, MessageEmbed } = require("discord.js");
const logger = require("../modules/logger.js");
const { getSettings, permlevel } = require("../modules/functions.js");
const config = require("../config.js");

module.exports = async (client, message) => {
    let logs = message.guild.channels.cache.find(channel => channel.name === "mod-log");

//   if (message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) && !logs) {
//     logs = await message.guild.channels.create("logs", { type: "GUILD_TEXT" }).catch(console.error);
//   }

  if (!logs) { 
    return console.log("The logs channel does not exist and cannot be created");
  }
  const entry = await message.guild.fetchAuditLogs({ type: "MESSAGE_DELETE" }).then(audit => audit.entries.first())
  let user = ""

  if (entry.executor.id === message.author.id) return

    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor.username
  }

  else { 
    user = message.author.username
  }

  let imageBaseUrl = 'https://cdn.discordapp.com'
  let userAvatarPath = `avatars/${client.user.id}/${client.user.avatar}`

    const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('[MESSAGE DELETE]')
	.setAuthor({ name: `${client.user.username}`, iconURL: `${imageBaseUrl}/${userAvatarPath}.jpg`})
	.setDescription(`A message was deleted in ${entry.extra.channel.name}`)
	.setThumbnail(`${imageBaseUrl}/${userAvatarPath}.jpg`)
	.addFields(
		{ name: 'Executor', value: entry.executor.username },
    { name: 'Delete Target', value: message.author.username },
		{ name: '\u200B', value: '\u200B' },
	)
	.setTimestamp()
    logs.send({ embeds: [exampleEmbed] });

  //   const exampleEmbed = new MessageEmbed()
	// .setColor('#0099ff')
	// .setTitle('[MESSAGE DELETE]')
	// .setURL('https://discord.js.org/')
	// .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	// .setDescription('Some description here')
	// .setThumbnail('https://i.imgur.com/AfFp7pu.png')
	// .addFields(
	// 	{ name: 'Regular field title', value: 'Some value here' },
	// 	{ name: '\u200B', value: '\u200B' },
	// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
	// 	{ name: 'Inline field title', value: 'Some value here', inline: true },
	// )
	// .addField('Inline field title', 'Some value here', true)
	// .setImage('https://i.imgur.com/AfFp7pu.png')
	// .setTimestamp()
	// .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
    
  //   logs.send({ embeds: [exampleEmbed] });

    
    //logs.send(`A message from ${message.author.username} was deleted in ${message.channel.name} by ${user}`);
}
