const discord = require('discord.js');
const moment = require("moment")

module.exports = class help {
    constructor(){
        this.name = "help",
        this.alias = '',
        this.usage = "$help"
    }

    async run(bot,message,args) {
        const embed = new discord.RichEmbed()
        .setTitle("Help Command")
        .setThumbnail(bot.user.displayAvatarURL)
        .setColor("BLUE") 
        .setDescription(`:tools: **Work In Progress** :tools: \n\nThis is a work in progress bot and will not have a proper help command until it is completed. \n\nCurrent Commands: \`eval, help, invinfo, suggest, userinfo\``)
        .setFooter(`Developer - ${message.guild.members.get("452661781752578048").user.tag}`)
        message.channel.send(embed) 
    }
}