const { getSettings } = require("../modules/functions");

exports.run = (client, message, args) => {
    user = message.author
    let duration = 5;
    console.log(getSettings(client))
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['remind'],
    permLevel: "Bot Admin"
  };
  
exports.help = {
    name: "remindme",
    category: "System",
    description: "timer",
    usage: "remind [time]"
};