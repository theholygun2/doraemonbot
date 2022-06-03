// client.users.cache
// client.guilds.cache
// client.channels.cache
// guild.channels.cache
// guild.members.cache
// message logs (in the callback of messages.fetch())
// client.emojis.cache

exports.run = (client, message) => {
    console.log(client.channels.cache.get("962275321208524841"))
    let data = JSON.stringify(client.channels.cache.get("962275321208524841"))
    message.channel.send(data)
    console.log(client.users.cache.get("468047721765535746"))
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['t'],
    permLevel: "admins"
  };

  exports.help = {
    name: "testing",
    category: "GG",
    description: "test",
    usage: "usage:"
  };

