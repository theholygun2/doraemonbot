const {Users, Courses} = require("../dbObjects")
const { Op } = require('sequelize');

exports.run = async (client, message, args) => {
  const user = message.author
  const [name, newName] = (args)

  if(!name) return
  if(newName.length > 10 ) return message.reply("can be more than 10")
  try {
      const row = await Courses.findOne({where: {user_id: user.id, name: {[Op.like]: name}}})
      if(row) {
        row.set({name: newName})
        await row.save()
        return message.reply(`Your subject key is edited!`)
      }
  } catch (error) {
      console.log(error);
      return message.reply("error")
  }
  message.reply(`"Key ${name} not found!"`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['e','ed'],
    permLevel: "User"
  };

  exports.help = {
    name: "edit",
    category: "Cours",
    description: "Edit cours | ~a <cours> <newcours>",
    usage: "~e <cours> <newcours>"
  };