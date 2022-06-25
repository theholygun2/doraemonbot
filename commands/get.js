const { Users, Courses } = require('../dbObjects.js');

exports.run = async (client, message, mention) => {
  // equivalent to: SELECT name FROM tags;
  const user = message.author
  const target = message.mentions.users.first()

  async function getCoursById(db_user, target){
    try {
        const row = await Courses.findAll({where: {user_id: target.id}})
        if(!row) return message.reply(`${target.name} dont have any links saved`)
        row.forEach(target => {
            Courses.findOrCreate({where: {name: target.name, user_id: db_user.id}, defaults: {link: target.link}})
          });
    } catch (error) {
        console.log(error)
        return message.reply("there some kind of error")
    }
  }

  try {
    if(!target || target === user) return
    const db_user = Users.findOne({where: {user_id: user.id}})
    if(!db_user) await Users.create({user_id: user.id, username: user.username}).then(getCoursById(db_user.id, target.id) )
    return message.reply(`link imported from user ${target.username}`);
  } catch (error) {
    return message.reply("there some kind of error")
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
    category: "Cours",
    description: "import cours dari memberlain | ~g @namauser",
    usage: "[prefix]add '[Subject] [link]'"
  };