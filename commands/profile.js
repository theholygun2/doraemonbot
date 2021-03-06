const moment = require('moment-timezone');

exports.run = async (client, message) => {
    const user = message.author;
    const member = message.member;
    const timeZone = 'Asia/Jakarta';
    const DATE_FORMAT = 'DD/MM/YYYY';

    nickname = (member.nickname) ? member.nickname : user.username;
    
    let userCreatedAt = moment(user.createdAt.toISOString()).tz(timeZone).format(DATE_FORMAT);
    let memberJoinedAt = moment(member.joinedAt.toISOString()).tz(timeZone).format(DATE_FORMAT);
    let avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg`

    message.channel.send({ embeds: [{
        color: 3447003,
    thumbnail: {
      url: avatarUrl
    },
    fields: [
    {
    name: "Username:",
    value: user.tag,
    inline: true
    },
    {
    name: "Display name:",
    value: nickname,
    inline: true
    },
    {
    name: "Account created at:",
    value: userCreatedAt,
    inline: true
    },
    {
      name: "Masuk server ini pada tanggal:",
      value: memberJoinedAt,
      inline: true
    },
    {
    name: "\u200b",
    value:"\u200b"
    }],
    timestamp: new Date(),
    footer: {
      icon_url: avatarUrl,
      text: user.username
    }
    }]});
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['p','prof'],
    permLevel: "User"
  };

  exports.help = {
    name: "profile",
    category: "Member",
    description: "Get Profile",
    usage: "~profile"
  };




// message.channel.send({ embeds: [{
//     color: 3447003,
//     author: {
//         name: "Author Name, it can hold 256 characters",
//         icon_url: "https://i.imgur.com/lm8s41J.png"
// },
// thumbnail: {
//   url: "http://i.imgur.com/p2qNFag.png"
// },
// image: {
// url: "http://i.imgur.com/yVpymuV.png"
// },
// title: "This is your title, it can hold 256 characters",
// url: "https://discord.js.org/#/docs/main/master/class/MessageEmbed",
// description: "This is the main body of text, it can hold 2048 characters.",
// fields: [{
// name: "This is a single field title, it can hold 256 characters",
// value: "This is a field value, it can hold 1024 characters.",
// inline: false
// },
// {
// name: "Inline fields",
// value: "They can have different fields with small headlines, and you can inline them.",
// inline: true
// },
// {
// name: "Masked links",
// value: "You can put [masked links](https://discord.js.org/#/docs/main/master/class/MessageEmbed) inside of rich embeds.",
// inline: true
// },
// {
// name: "Markdown",
// value: "You can put all the *usual* **__Markdown__** inside of them.",
// inline: true
// },
// {
// name: "\u200b",
// value:"\u200b"
// }],
// timestamp: new Date(),
// footer: {
// icon_url: "http://i.imgur.com/w1vhFSR.png",
// text: "This is the footer text, it can hold 2048 characters"
// }
// }]});