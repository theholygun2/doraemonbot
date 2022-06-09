const {Users, Courses} = require("../dbObjects")
const { Op } = require('sequelize');

exports.run = async (client, message, [name]) => {
    const user = message.author
    name = name[0]
    if(!name) return 

    if(name == "all"){        
        const allRow = await Courses.findOne({where: {user_id: user.id}})
        await allRow.destroy()
        return message.reply('all key deleted')
    }

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
    category: "Cours",
    description: "delete <cours>",
    usage: "~d <cours>'"
  };