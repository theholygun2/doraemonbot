const { MessageActionRow, MessageButton } = require('discord.js');

exports.run = (client, message) => {
  const msg = "Doraemon is here!!! With his Pocket To Help Your Server"
  return message.channel.send("")
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['dis'],
    permLevel: "User"
  };
  
  exports.help = {
    name: "disclamer",
    category: "Member",
    description: "_",
    usage: "disclamer"
  };
  