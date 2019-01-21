const discord = require("discord.js")
const fs = require("fs")

module.exports = class setchannel {
    constructor() {
        this.name = 'setlchannel',
        this.alias = ['logchannel', 'setlogchannel', 'setlchannel'], 
        this.usage = 'a!setlchannel [channel id]'
    }

    run(bot,message,args) {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Missing required permissions `MANAGE_GUILD`!")
        if(isNaN(args[0])) return message.reply("Please provide a channel ID!")
        let channels = JSON.parse(fs.readFileSync('./storage/guilds.json', 'utf8')); //Calling the JSON file.
        let modlog = args[0]
        if(!channels[message.guild.id]) channels[message.guild.id] = {}
        channels[message.guild.id].modlog = `${modlog}`

        fs.writeFile('./storage/guilds.json', JSON.stringify(channels), (err) => {
            if(err) console.log(err); 
        })
        message.channel.send(`:white_check_mark: Set log channel to ${message.guild.channels.get(`${modlog}`)}`)
    }
}