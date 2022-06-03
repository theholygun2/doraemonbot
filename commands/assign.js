const { settings } = require("../modules/settings.js");

exports.run = (client, message, [action, key, ...value], level) => {
    
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ass'],
    permLevel: "User"
  };

  exports.help = {
    name: "assign",
    category: "Class",
    description: "add links",
    usage: "[prefix]add '[Subject] [link] [meetlink]'"
  };