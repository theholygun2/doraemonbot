const config = require("../config.js");
const { settings } = require("../modules/settings.js");
exports.run = async (client, message, args, level) => {
  const friendly = config.permLevels.find(l => l.level === level).name;
  const replying = settings.ensure(message.guild.id, config.defaultSettings).commandReply;
  message.reply({ content: `Your permission level is: ${level} - ${friendly}`, allowedMentions: { repliedUser: (replying === "true") }});
};

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: ["mylvl",'my lvl', 'my level'],
  permLevel: "User"
};

exports.help = {
  name: "mylevel",
  category: "Miscellaneous",
  description: "Tells your permission level for the current message location.",
  usage: "mylevel"
};
