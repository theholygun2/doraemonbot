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
    
//     Embed.addFields(
//       { name: 'shell', value: 'https://elearning.pnj.ac.id/course/view.php?id=10774'},
//       { name: 'Link', value: 'https://meet.google.com/qbk-gwnw-ecu'},
//       { name: 'pm', value: 'https://elearning.pnj.ac.id/course/view.php?id=10777' },
//       { name: 'eng', value: 'https://elearning.pnj.ac.id/course/view.php?id=10780' },
//       { name: 'proj', value: 'https://elearning.pnj.ac.id/course/view.php?id=10782' },
//       { name: 'dist', value: 'https://elearning.pnj.ac.id/course/view.php?id=10779' },
//       { name: 'java', value: 'https://elearning.pnj.ac.id/course/view.php?id=10776' },
//       { name: 'security', value: 'https://elearning.pnj.ac.id/course/view.php?id=10778' },
//       { name: 'crypto', value: 'https://classroom.google.com/u/0/c/NDgyNTYwNTQ5NzM1' },
//       { name: 'mikrotik', value: 'https://elearning.pnj.ac.id/course/view.php?id=10775' },
// )
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
    category: "Class",
    description: "List of classes",
    usage: "[prefix]class"
  };