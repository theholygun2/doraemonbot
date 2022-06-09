const { Permissions, MessageEmbed } = require("discord.js");
const {Users, Courses} = require("../dbObjects")

exports.run = async (client, message) => {

    const guildId = message.guild.id;
    const user = message.author
    const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg`
    const Embed = new MessageEmbed()
    .setTitle(`[YOUR COURS] ${user.tag}`)
    .setThumbnail(`${avatarUrl}`);
    const db_user = await Users.findOne({where: { user_id: user.id}})
  if(db_user){
    const cours = await Courses.findAll({where: {user_id: user.id}})
    cours.forEach(target => {
      Embed.addField(target.name, target.link)
    });
  }
  return message.reply({embeds: [Embed]})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['cl'],
    permLevel: "User"
  };

  exports.help = {
    name: "class",
    category: "Cours",
    description: "List of courses",
    usage: "[prefix]class"
  };