const { Users, Courses } = require('../dbObjects.js');
const { MessageEmbed, User } = require('discord.js')
const { Op } = require('sequelize');

exports.run = async (client, message, args) => {
  
  console.log(args.length)
  if(args.length != 2) return
  const [name, kode] = args
  const user = message.author
  let link = "https://elearning.pnj.ac.id/course/view.php?id="
  
  if(name.length > 10) return message.reply("subject must not be longer than 10 characters/digit")
  isNaN(kode) ? link=kode : link=`${link}${kode}`
  
  const db_user = await Users.findOne({where: {user_id: user.id}})
  var newCours = Courses.build({ name: name, link: link, user_id: user.id});
  if(!db_user){
      try {
        await Users.create({user_id: user.id, username: user.tag}).then(newCours.save())
        return message.reply(`Link saved to ${newCours.name}`)
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
              return
          }
      }
    }
    const row = await Courses.findOne({where: {user_id: user.id, name: {[Op.like]: name}}})
      if(row) {
        row.set({link: link})
        await row.save()
        return message.reply(`Link inside ${name} has been changed`)
      }
    return message.reply(`Link has been saved to ${name}`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['a','ad'],
    permLevel: "User"
  };

  exports.help = {
    name: "add",
    category: "Cours",
    description: "Masukan cours | ~a <cours> <id/link>",
    usage: "~a <cours> <kode/link> | ~a shellscript <123456>"
  };