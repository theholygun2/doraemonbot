const {Users, Courses} = require("../dbObjects")
const { Op } = require('sequelize');

exports.run = async (client, message, [...name], perm) => {
    const user = message.author
    if(name.length == 0) return 
    if(name.length == 1 && name[0] == 'all'){        
        await Courses.destroy({where: {user_id: user.id}})
        return message.reply('all key deleted')
    }
    name = name.join(' ').toString()
    console.log(name)

    try {
        const row = await Courses.findOne({where: {user_id: user.id, name: {[Op.like]: name}}})
        if(row) {
            await row.destroy()
            return message.reply(`Key: ${name} deleted sucessful`) 
        }
    } catch (error) {
        console.log(error);
        return message.reply("lala")
    }
    
    message.reply(`"Key ${name} not found!"`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['del','d'],
    permLevel: "User"
  };

  exports.help = {
    name: "delete",
    category: "Course",
    description: "delete <course> / del all",
    usage: "~d <course>'"
  };