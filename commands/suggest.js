const discord = require('discord.js');

module.exports = class idea {
    constructor(){
        this.name = 'suggest',
        this.alias = ['compile'],
        this.usage = 'a!suggest [idea]'
    }

    run(bot,message,args) {
      const idea = args.join(" ") 
      const embed = new discord.RichEmbed()
      .setTitle("New Idea") 
      .setColor("#fff600")
      .setThumbnail(message.author.displayAvatarURL)
      .addField("User", message.author.tag + " || " + message.author.id)
      .addField("Idea", idea) 
      const sugchan = message.guild.channels.get("514930066799722503")
      sugchan.send(embed).then(m => {
        m.react("✔").catch(err => message.channel.send(`${message.member} Error! ${err}`))
        m.react("✖").catch(err => message.channel.send(`${message.member} Error! ${err}`))
      })
      message.channel.send(`${message.member}, Suggestion submitted.`) 
    }

}