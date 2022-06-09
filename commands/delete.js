const {Users, Courses} = require("../dbObjects")

exports.run = async (client, message, name) => {
    const user = message.author
    const row = await Courses.findOne({where: {user_id: user.id, name: name}})
    if(row) {
        try {
            await row.destroy()
            return message.reply(`Key: ${name} deleted sucessful`)   
        } catch (error) {
            console.log(error)
        }
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
    description: "delete ",
    usage: "[prefix]delete <key>'"
  };