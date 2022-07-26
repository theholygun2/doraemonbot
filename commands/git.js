exports.run = (req,res) => {

    // const embeds = await getUserCourse(user)
    const commands = "git clone <https://name-of-the-repository-link>"

    return message.reply({embeds: [embeds]});
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };

  exports.help = {
    name: "git",
    category: "Commands",
    description: "Get git Commands",
    usage: "~git"
};

[{
    etagg: ""
}]