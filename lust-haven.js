const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const moment = require('moment')
const { CommandHandler } = require("djs-commands");
const CH = new CommandHandler({
  folder: __dirname + "/commands/",
  prefix: `${botconfig.prefix}`,
})

const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const chalk = require("chalk")
bot.commands = new Discord.Collection();

bot.on("ready", async () => {
  console.log(chalk.greenBright(botconfig.onReadyMsg));
  bot.user.setActivity(`$help || Lust Haven`, {type: "WATCHING"});

});

bot.on("message", (message) => {
  if(message.channel.type === 'dm') return;
  if(message.author.bot) return;
  let messageArray = message.content.split(" ")
  let args = messageArray.slice(1)
  let command = messageArray[0];
  let cmd = CH.getCommand(command);
  if(!cmd) return;

  try{
      cmd.run(bot,message,args)
  }catch(e){
      console.log(e)
  }

});

bot.on('guildMemberAdd', (member) => {
  try {
    const guild = member.guild
    const channels = JSON.parse(fs.readFileSync('storage/guilds.json', 'utf8')); 
    const lchannel = channels[guild.id].logchn
    if(!lchannel) return; 
    const embed2 = new Discord.RichEmbed()
    .setTitle("Member Joined")
    .setColor("BLUE")
    .setThumbnail(member.user.displayAvatarURL)
    .addField("User", member.user + " || " + member.user.tag)
    .addField("New Member Count", guild.memberCount)
    .setFooter("ID: " + member.user.id + " || " + moment(new Date()).format("LLLL"))
    guild.channels.get(lchannel).send(embed2).catch(console.log)
  }catch(e) {
    console.log(e) 
  }
})

bot.on('messageDelete', (message) => {
  const guild = message.guild
  const channels = JSON.parse(fs.readFileSync('storage/guilds.json', 'utf8'));
  const lchannel = channels[message.guild.id].logchn
  if(!lchannel) return; 
  const embed = new Discord.RichEmbed()
  .setTitle("Message Deleted")
  .setColor("RED")
  .setThumbnail(message.author.displayAvatarURL)
  .addField("Message Content", message.content, true)
  .addField("Message Author", message.author + " || " + message.author.id, true)
  .addField("Message Channel", message.channel, true)
  .addField("Message Delete Time", moment(new Date()).format("LLLL"), true)
  message.guild.channels.get(lchannel).send(embed).catch(console.error)
})

bot.on('error', (error) => {    
  if(error.message == 'Unexpected server response: 520'){
    console.log("Cant connect to Discords API, Retrying...");
  }else if(error.message == 'read ECONNRESET'){
    console.log("Connection Reset! Reconnecting...");
  }else{
    console.error(error);
  }            
});

bot.login(botconfig.token);

