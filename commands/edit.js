exports.run =() => {

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['a','ad'],
    permLevel: "User"
  };

  exports.help = {
    name: "edit",
    category: "Cours",
    description: "Masukan ID elearning atau link | ~a <cours> <id/link>",
    usage: "~a <cours> <kode/link> | ~a shellscript <123456>"
  };