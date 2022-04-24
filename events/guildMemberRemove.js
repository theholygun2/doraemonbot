const { Permissions } = require("discord.js");

module.exports = async (member) => {
    const entry = await message.guild.fetchAuditLogs({ type: "MEMBER_KICK" }).then(audit => audit.entries.first())

    const { executor, target } = entry;

    if (target.id === member.id) {
        console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}`);
    }
    else {
        console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}`);
    }
}