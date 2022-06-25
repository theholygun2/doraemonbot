const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

exports.run = (client, message) => {
<<<<<<< HEAD
  const msg = "Doraemon is here!!! With his Pocket To Help Your Server"
  return message.channel.send("")
=======
  const avatarUrl = `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.jpg`
  const text = `
Hello!
For now, the bot function is to work as a storage for server member to store links in key-value shcema.

Server member would be able to:
- Display links
- Save/add a link
- Edit a link
- Delete all links or a link
- Import links from another user
- Timer(scuffed as f btw)


***IMPORTANT***

Notice that when adding or viewing your links, other server member can see what you add/view
Other members would not be able to save, edit, or delete your saved links

with <3 PocketDoraemon Developer Team`

const embed = new MessageEmbed()
.setColor(3447003)
.setTitle(`POCKET DORAEMON BOT`)
.setThumbnail(`${avatarUrl}`)
.setDescription(text)

message.reply({embeds: [embed]});
>>>>>>> b1
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['dis','disclamer'],
  permLevel: "User"
};

exports.help = {
  name: "disclamer",
  category: "Member",
  description: "dislamer",
  usage: "~dis"
};
  