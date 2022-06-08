
exports.run = (client, message) => {
    message.reply("BLA BLA")
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "disclamer",
    category: "Member",
    description: "Evaluates arbitrary javascript.",
    usage: "eval [...code]"
  };
  