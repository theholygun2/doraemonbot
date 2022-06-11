const {Users, Courses} = require('../dbObjects')

exports.run = async (client, message, role) => {
  // equivalent to: SELECT name FROM tags;
  const user = message.author

	const users = await Users.findAll();
	const userString = users.map(t => t.user_id).join(', ') || 'No users set.';
  const ALLcours = await Courses.findAll()
  const ALLcoursString = await ALLcours.map(t => t.name).join(', ') || 'No courses set.';

	return message.reply(`Users in database: ${userString} |-| Courses in database: ${ALLcoursString}. `);

}

exports.conf = {
    enabled: false,
    guildOnly: true,
    aliases: [],
    permLevel: "Admin"
  };

  exports.help = {
    name: "share",
    category: "Cours",
    description: "Masukan ID elearning atau link | ~a <cours> <id/link>",
    usage: "~a <cours> <kode/link> | ~a shellscript <123456>"
  };