exports.run = (client, message) => {
    let user = message.author
    
    let userAvatarPath = `avatars/${user.id}/${user.avatar}`
    let avatarUrl = `https://cdn.discordapp.com/${userAvatarPath}.jpg`

    message.channel.send({ embeds: [{
        color: 3447003,
        author: {
            name: user.username,
            icon_url: "https://i.imgur.com/NQ3knjY.jpeg"
    },
    thumbnail: {
      url: avatarUrl
    },
    image: {
    url: avatarUrl
    },
    title: "",
    url: "",
    description: "Description",
    fields: [{
    name: "This is a single field title, it can hold 256 characters",
    value: "This is a field value, it can hold 1024 characters.",
    inline: false
    },
    {
    name: "\u200b",
    value:"\u200b"
    }],
    timestamp: new Date(),
    footer: {
    text: "This is the footer text, it can hold 2048 characters"
    }
    }]});
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Bot Admin"
  };
  
exports.help = {
    name: "profile",
    category: "System",
    description: "Display your profile",
    usage: "profile"
};