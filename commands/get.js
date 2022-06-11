const { Users, Courses } = require('../dbObjects.js');

exports.run = async (client, message, mention) => {
  // equivalent to: SELECT name FROM tags;
  const user = message.author
  const target = message.mentions.users.first()

  if(!target || target === user) return
  const db_user = Users.findOne({where: {user_id: user.id}})
  if(!db_user) await Users.create({user_id: user.id, username: user.username})
  await Courses.destroy({where: {user_id: user.id}})
  
  const allRow = await Courses.findAll({where: {user_id: target.id}})
  if(!allRow) return "user dont have any link saved"

  allRow.forEach(target => {
    Courses.create({user_id: user.id, name: target.name, link: target.link})
  });

	return message.reply(`link imported from user ${target.username}`);
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