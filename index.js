const Discord = require("discord.js");

const TOKEN = "NDkwODY5NDE3NzY1MzcxOTU0.DoQFPQ.-TQ8I21J-XXppQSur47Av7Scbag";

const YTDL = require("ytdl-core");

const PREFIX = "*";

var bot = new Discord.Client();
var servers = {};

function play(connection, message){
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function(){
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

bot.on("ready", function() {
    console.log("Ready");
});

bot.on("message", function(message){
    if (message.author.equals(bot.user))return;

var args = message.content.substring(PREFIX.length).split(" ");
var royalescrimsphoto = "https://i.imgur.com/Vc3VRkO.png";
switch (args[0].toLowerCase()) {
    case "snipeinfo":
        var embed = new Discord.RichEmbed()
        .addField("Royale Scrims Community Snipe Info","Solo and Squad snipes on East and West servers.\n")
        .addField("Hosted by","@RemiiX\n")
        .addField("Ingame Rules:","Do not exploit game impacting bugs, including macros. If you aren't sure if a strategy is an exploit, ask or don't use it.\nDon’t cross team and avoid setting up fights as confusion can arise. \nDon't stream snipe, this includes calling out positioning, gear, or health. \nTeam rules can be found in #team-info.\n")
        .addField("Other scrim info:","How to enter scrims and other information can be found in #snipe-info.\n")
        .setColor(0x00FFFF)
        .setFooter("If I've been a bad bot, or you notice any issues, please message my owner Bon#3157.",royalescrimsphoto)
message.channel.sendEmbed(embed);    
        break;
    case "about":
        message.channel.send("Hi, I'm a discord bot created by Bon#3157. Please message him if you come across any errors, bugs, or if you have a suggestion :)");
        break;
    case "version":
        message.channel.send("SnipeBot v1.0.0. Next update will include more commands, better UI, and maybe music (but only if you have been good).");
        break;
    case "help":
        var embed2 = new Discord.RichEmbed()
        .addField("Commands","*snipeinfo - Gives information about snipes in this server. \n*about - My biography. \n*version - My version and what is intented to be added to me in the next update. \n*help - The help screen you are reading right now.")
        .setColor(0xFF00FF)
        .setFooter("If I've been a bad bot, or you notice any issues, please message my owner Bon#3157.",royalescrimsphoto)
message.channel.sendEmbed(embed2)
        break;
    case "countdown":
        if (!message.member.voiceChannel) {
            message.channel.sendMessage("You must be in a voice channel to initiate a countdown.");
            return;
        }
        if (!servers[message.guild.id]) servers[message.guild.id] = {
            queue:[]
        };
        var server = servers[message.guild.id];

        server.queue.push(args[1]);

        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
            play(connection, message);
        })
        break;
    case "stop":
        var server = servers[message.guild.id];

        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;
    default:
        message.channel.sendMessage("Invalid Command. Type '*help' for commands and other information.");

}

});

bot.login(TOKEN);