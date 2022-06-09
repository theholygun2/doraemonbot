const { Users, Courses } = require('../dbObjects.js');

exports.run = async (client, message) => {
  // equivalent to: SELECT name FROM tags;
  const user = message.author

	const users = await Users.findAll();
	const userString = users.map(t => t.user_id).join(', ') || 'No users set.';
  const ALLcours = await Courses.findAll({where: {user_id: user.id}})
  const ALLcoursString = await ALLcours.map(t => t.name).join(', ') || 'No courses set.';
  

  const db_user = await Users.findOne({where: { user_id: user.id}})
  if(db_user){
    const cours = await Courses.findAll({where: {user_id: user.id}})
    const coursString = await cours.map(t => `${t.name}: ${t.link}` ).join(', ') || 'No courses set.';
    return message.reply(`YOUR LINKS SIR!: ${coursString}`)
  }

  
  //const cours = await Courses.findOne({where: {user_id: message.author.id}})

  //const getC = await user.getCourses(Courses)
  //if(getC) console.log(getC)

	return message.reply(`messager: ${message.author.username} |-| Users in database: ${userString} |-| Courses in database: ${coursString}. `);
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