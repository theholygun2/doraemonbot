const { Permissions } = require("discord.js");

module.exports = (member) => {
    const entry = await message.guild.fetchAuditLogs({ type: "MEMBER_KICK" }).then(audit => audit.entries.first())
}