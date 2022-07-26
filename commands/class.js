const { MessageEmbed, MessageActionRow, MessageButton, Formatters, Interaction } = require("discord.js");
const {Users, Courses} = require("../dbObjects")
const { toProperCase } = require('../modules/functions')
// linkinvite = https://discord.com/oauth2/authorize?client_id=960462993244684288&scope=bot&permissions=2147576976
exports.run = async (client, message) => {

    const user = message.author
    const embeds = await getUserCourse(user)
    return message.reply({embeds: [embeds]});
}



async function getUserCourse(user){
  
  const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg`
  const embed = new MessageEmbed()
    .setColor(3447003)
    .setTitle(`${user.tag}`)
    .setThumbnail(`${avatarUrl}`);
    
    const cours = await Courses.findAll({where: {user_id: user.id}, order: [['name', 'ASC']]})
    cours.forEach(target => {
      embed.addField("\u200b",Formatters.hyperlink(`${toProperCase(target.name)}`, `${target.link}`, `${target.link}`))
    });

    return embed
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['cl', 'c'],
    permLevel: "User"
  };

  exports.help = {
    name: "class",
    category: "Course",
    description: "List of courses | ~c",
    usage: "~c"
  };