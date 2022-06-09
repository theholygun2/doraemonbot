const { settings } = require("../modules/settings.js");
const { Users, Courses } = require('../dbObjects.js');

exports.run = async (client, message, args) => {

  const [name, link] = (args);
  const user = message.author
  var newCours = Courses.build({ name: name, link: link, user_id: user.id});

  const res = await Users.findOne({where: { user_id: user.id}})
  if(!res){
    try {
      await Users.create({user_id: user.id, username: user.username})
      await newCours.save()
      return message.reply(`Hello new user~ ${newCours.link} has been saved to: ${newCours.name} you can use: ~class to look at your saved links!`)
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
            console.log(`User already exists in the database`);
            return
          }
    }
  }
  else{
    const target = await Courses.findOne({where: {user_id: res.user_id, name: newCours.name}})
    if(target){
      target.set({link: newCours.link})
      await target.save()
      return message.reply(`Your link are edited!! ${target.link} ==> ${newCours.link}`)
    }
    else{
      await newCours.save()
      return message.reply(`Your link: ${newCours.link} has been saved to: ${newCours.name} you can use: ~class to look at your saved links!`)
    }
  } 
  return console.log("something wrong men")
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ass'],
    permLevel: "User"
  };

  exports.help = {
    name: "assign",
    category: "Cours",
    description: "add links",
    usage: "[prefix]'"
  };