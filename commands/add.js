const { Users, Courses } = require('../dbObjects.js');
const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
  
  const [name, kode] = args
  const user = message.author
  let link = "https://elearning.pnj.ac.id/course/view.php?id="
<<<<<<< HEAD
  if(args.length == 0) return message.reply({content: 'OWKOKWW'})   
  if(!name) return message.reply("~a <newcours> <elearningid/link>")
  if(name.length > 8) return message.reply("subject must not be longer than 8 characters/digit")
=======

  if(name.length > 10) return message.reply("subject must not be longer than 10 characters/digit")
>>>>>>> b1
  isNaN(kode) ? link=kode : link=`${link}${kode}`
  
  
  var newCours = Courses.build({ name: name, link: link, user_id: user.id});
  const db_user = await Users.findOne({where: { user_id: user.id}})
  if(!db_user){
      try {
        await Users.create({user_id: user.id, username: user.username})
        await newCours.save()
        return message.reply(`Link saved to ${newCours.name}`)
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
              return
          }
      }
    }
    else{
      const target = await Courses.findOne({where: {user_id: db_user.user_id, name: newCours.name}})
      if(target){
        target.set({link: newCours.link})
        await target.save()
        return message.reply(`Your link is edited!`)
      }
      else{
        await newCours.save()
        return message.reply(`Your link has been saved to: ${newCours.name}. use ~c to show`)
      }
    }
    return console.log("something wrong men")
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