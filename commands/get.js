const { Users, Courses } = require('../dbObjects.js');

exports.run = async (client, message) => {
  // equivalent to: SELECT name FROM tags;
  const user = message.author
  const target = message.mentions.users.first()

  if(!target || target === user) return
    const db_user = await Users.findOne({where: {user_id: user.id}})
    if(!db_user){
      await Users.create({user_id: user.id, username: user.tag})
    }
    await importById(user, target)
    return message.reply(`link imported from user ${target.username}`)
}

async function importById(user, from){
  try {
      const fromRow = await Courses.findAll({where: {user_id: from.id}})
      for (const row of fromRow){
        await Courses.findOrCreate({where: {name: row.name, user_id: user.id}, defaults: {link: row.link}})
      }
  } catch (error) {
      console.log(error)
  }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['g'],
    permLevel: "User"
  };

  exports.help = {
    name: "get",
    category: "Course",
    description: "import course dari memberlain | ~g @namauser",
    usage: "[prefix]add '[Subject] [link]'"
  };