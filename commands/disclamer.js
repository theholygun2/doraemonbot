const { MessageActionRow, MessageButton } = require('discord.js');

exports.run = (client, message) => {
  
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
    usage: "eval [...code]"
  };
  