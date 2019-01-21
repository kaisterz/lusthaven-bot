const discord = require('discord.js');
const botconfig = require('../botconfig.json')

module.exports = class evalcmd {
    constructor(){
        this.name = 'eval',
        this.alias = ['compile'],
        this.usage = 'a!eval [code]'
    }

    run(bot,message,args) {
        if(message.author.id !== botconfig.ownerID) return; 
        if(!args[0]) return message.reply("Please provide arguments.");
        let code = args.join(" ")
        try {
            let evaled = eval(code)
            const embed = new discord.RichEmbed() 
            .setTitle("Eval Successful")
            .setColor("BLUE")
            .addField("Result", evaled)
            message.channel.send(embed) 
        }catch(err) {
            message.channel.send(`Error: ${err}`)
        }
        
    }

}


