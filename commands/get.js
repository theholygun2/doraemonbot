const { Users, Courses } = require('../dbObjects.js');

exports.run = async (client, message) => {
  // equivalent to: SELECT name FROM tags;
  const user = message.author

	const users = await Users.findAll();
	const userString = users.map(t => t.user_id).join(', ') || 'No users set.';
  const ALLcours = await Courses.findAll()
  const ALLcoursString = await ALLcours.map(t => t.name).join(', ') || 'No courses set.';

	return message.reply(`Users in database: ${userString} |-| Courses in database: ${ALLcoursString}. `);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['g'],
    permLevel: "Admin"
  };

  exports.help = {
    name: "get",
    category: "cours",
    description: "get",
    usage: "[prefix]add '[Subject] [link]'"
  };