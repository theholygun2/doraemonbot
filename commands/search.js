//const request = require('request-promise')

exports.run = (client, message) => {
    const api = `https://api.dictionaryapi.dev/api/v2/entries/en/`
}  
  exports.conf = {
    enabled: false,
    guildOnly: true,
    aliases: ['dis','disclamer'],
    permLevel: "User"
  };
  
  exports.help = {
    name: "search",
    category: "Member",
    description: "search",
    usage: "~s"
  };

