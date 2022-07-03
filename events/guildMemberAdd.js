const { getSettings } = require("../modules/functions.js");

module.exports = (client, member) => {
    
    console.log('kadf')
    const settings = getSettings(member.guild);

    if (settings.welcomeEnabled !== "true") return;

    const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

    member.guild.channels.cache.find(c => c.name === settings.welcomeChannel).send(welcomeMessage).catch(console.error);
}