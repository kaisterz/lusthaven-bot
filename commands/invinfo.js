const discord = require('discord.js');
const moment = require("moment")

module.exports = class invinfo {
    constructor(){
        this.name = "invinfo",
        this.alias = '',
        this.usage = "!invinfo [url]"
    }

    async run(bot,message,args) {
        const inv = args[0] 
        bot.fetchInvite(inv).then(inv => {
            const embed = new discord.RichEmbed()
            .setTitle("Invite Info")
            .setColor("BLUE")
            .addField("Guild Name", inv.guild.name, true)
            .addField("Guild ID", inv.guild.id, true)
            .setThumbnail(inv.guild.iconURL)
            .addField("Invite Creator", inv.inviter.tag, true)
            .addField("Approx. Member Count", inv.memberCount, true)
            message.channel.send(embed)
        })
    }
}