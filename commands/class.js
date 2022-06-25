const { MessageEmbed, MessageActionRow, MessageButton, Formatters, Interaction } = require("discord.js");
const {Users, Courses} = require("../dbObjects")
const { toProperCase } = require('../modules/functions')

exports.run = async (client, message) => {

    const user = message.author
    const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg`
    const embed = new MessageEmbed()
    .setColor(3447003)
    .setTitle(`[YOUR COURS] ${user.tag}`)
    .setThumbnail(`${avatarUrl}`);
    const db_user = await Users.findOne({where: { user_id: user.id}})

    if(!db_user) return message.reply("cours is empty! add a course using: ~a <newcours> <elearnId/link>")
    const cours = await Courses.findAll({where: {user_id: user.id}})
    cours.forEach(target => {
      embed.addField("\u200b",Formatters.hyperlink(`${toProperCase(target.name)}`, `${target.link}`, `${target.link}`))
    });
    
    return message.reply({embeds: [embed]});
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['cl', 'c'],
    permLevel: "User"
  };

  exports.help = {
    name: "class",
    category: "Cours",
    description: "List of courses | ~c",
    usage: "~c"
  };