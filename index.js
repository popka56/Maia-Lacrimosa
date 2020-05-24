/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
================================================================================================
=====================================IMPORTS====================================================
================================================================================================
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
//Require
const Discord = require('discord.js');
const fetch = require('node-fetch');
//Get bot token from local file
const instance = require('./token.js');
let token = instance.getToken();
let destinyApiKey = instance.getApiKey();

//Create our bot
const bot = new Discord.Client();
const prefix = 'Maia, ';

/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
================================================================================================
=====================================DECLARATIONS===============================================
================================================================================================
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

//Objects
let ffxivItemData = {
    ID: "",
    Name: "",
    Description: "",
    Type: "",
    Icon: ""
}

let ffxivProfileData = {
    ID: "",
    Name: "",
    Server: "",
    Datacenter: "",
    Avatar: "",
    Gender: 0,
    Race: 0,
    ActiveClass: "",
    ClassLevel: 0,
    GrandCompany: "",
    FreeCompany: "",
    Title: "",
    TitleId: 0
}

let Servers = {
    Aether: "",
    Chaos: "",
    Crystal: "",
    Elemental: "",
    Gaia: "",
    Light: "",
    Mana: "",
    Primal: ""
}

//Strings
let songName = '';
let youtubeLink = '';

//Ints
let numberOfResults = 0;

/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
================================================================================================
=====================================ON READY===================================================
================================================================================================
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
bot.on('ready', () => {
    let randomSong = Math.floor(Math.random() * 10);
    switch(randomSong){
        case 0:
            songName = 'Fiend';
            youtubeLink = 'https://www.youtube.com/watch?v=xdV_bzJgRxE';
            break;
        case 1:
            songName = 'Metal';
            youtubeLink = 'https://www.youtube.com/watch?v=UhDvQIqEkuI';
            break;
        case 2:
            songName = 'Equilibrium';
            youtubeLink = 'https://www.youtube.com/watch?v=knV-5VciTTQ';
            break;
        case 3:
            songName = "The Worm's Tail";
            youtubeLink = 'https://www.youtube.com/watch?v=LqmlXC4aodw';
            break;
        case 4:
            songName = 'Wayward Daughter';
            youtubeLink = 'https://www.youtube.com/watch?v=nMv9uiQsXvg';
            break;
        case 5:
            songName = 'Revenge of the Horde';
            youtubeLink = 'https://www.youtube.com/watch?v=AsxIXhYCi5Y';
            break;
        case 6:
            songName = 'Dragonsong';
            youtubeLink = 'https://www.youtube.com/watch?v=FtuwltmTp9I';
            break;
        case 7:
            songName = 'Landslide';
            youtubeLink = 'https://www.youtube.com/watch?v=U0G2auMMKlo';
            break;
        case 8:
            songName = 'Ultima';
            youtubeLink = 'https://www.youtube.com/watch?v=hXrtICZyzNo';
            break;
        case 9:
            songName = 'A Long Fall';
            youtubeLink = 'https://www.youtube.com/watch?v=NBIRYjP1NNM';
            break;
        default:
            songName = 'Moonfire Faire';
            youtubeLink = 'https://www.youtube.com/watch?v=JYZpcUO8ID4';
            break;
    }
    bot.user.setActivity(songName, {type: 'LISTENING'});
})

/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
================================================================================================
=====================================On MESSAGE=================================================
================================================================================================
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

//Preperations
bot.on('message', message => {
    // the message uses the prefix, or a variant of it
    if(message.content.startsWith(prefix) || message.content.startsWith('maia, ') || message.mentions.has(bot.user)){
        // split the message into an array called args for word for word specific commands
        let args = message.content.substring(prefix.length).split(' ');
        //remove the first index if it was a mention, as the first index will get the id of the bot otherwise
        if(message.mentions.has(bot.user)){
            args.splice(0, 1);
        }

/*====================================================================================
===========================COMMAND #1 - DISPLAY COMMANDS==============================
======[Maia, what can you do? || Maia, what are your commands || Maia, help]==========
====================================================================================*/
        if((args[0] == 'what' && args[1] == 'can' && args[2] == 'you' && (args[3] == 'do' || args[3] == 'do?')) || (args[0] == 'what' && args[1] == 'are' && args[2] == 'your' && (args[3] == 'commands' || args[3] == 'commands?')) || args[0] == 'help'){
            message.reply("I'll send you a pm! :)");
            showCommands(message);
        }
        // find items by id (Maia, find item X)
        else if(args[0] == 'find' && args[1] == 'item' && args[2] != null){
            //check if valid id
            if(args[2] >= 1 && args[2] <= 30281){
                //fetch the item
                findItem(args[2], message);
            }
            else{
                message.channel.send('No item with the id ' + args[2] + ' exists! \nTry a number between 1 and 30281.');
            }
        }
        //find random item (Maia, find random item)
        else if(args[0] == 'find' && args[1] == 'random' && args[2] == 'item'){
            //get a valid id
            let itemId = Math.floor(Math.random() * 30281) + 1;
            //fetch the item
            findItem(itemId, message);
        }
/*====================================================================================
=============================COMMAND #2 - FIND PLAYER=================================
==================[Maia, find player X (first name) Y (last name)]====================
====================================================================================*/
        else if(args[0] == 'find' && args[1] == 'player' && args[3] != undefined && args[4] == undefined){
            fetch('https://xivapi.com/character/search?name=' + args[2] + '+' + args[3])
            .then(response => response.json())
            .then(result => {
                if(!result.Results.length == 0){
                    numberOfResults = result.Results.length;
                    ffxivProfileData.ID = result.Results[Math.floor(Math.random() * result.Results.length)].ID;
                    fetch('https://xivapi.com/character/' + ffxivProfileData.ID + '?data=CJ,FC')
                    .then(response => response.json())
                    .then(result => {
                        let newResult = result;
                        processPlayerProfile(newResult, message);
                    })
                    //while fetching player profile
                    message.channel.send("I found " + numberOfResults + " player(s) with a matching name!");
                }
                else{
                    message.channel.send("I couldn't find that person :(\nDid you misspell the name?");
                }
            })
            //while fetching ID
            message.channel.send('Alright, hold on...');
        }
/*====================================================================================
=============================COMMAND #3 - FIND PLAYER ON SERVER=======================
============[Maia, find player X (first name) Y (last name) Z (server name)]==========
====================================================================================*/
        else if(args[0] == 'find' && args[1] == 'player' && args[4] == 'on' && args[5] != undefined){
            fetch('https://xivapi.com/character/search?name=' + args[2] + '+' + args[3] + '&server=' + args[5])
            .then(response => response.json())
            .then(result => { 
                if(!result.Results.length == 0){
                    ffxivProfileData.ID = result.Results[0].ID;
                    fetch('https://xivapi.com/character/' + ffxivProfileData.ID + '?data=CJ,FC')
                    .then(response => response.json())
                    .then(result => {
                            let newResult = result;
                            processPlayerProfile(newResult, message);
                        })
                        //while fetching player profile
                        message.channel.send("Found someone!");
                    }
                    else{
                        message.channel.send("I couldn't find that person :(\nDid you misspell the name or server?");
                    }
            })
            //while fetching ID
            message.channel.send("Okay, just a sec...");
        }
/*====================================================================================
=============================COMMAND #4 - GET STATUS MUSIC============================
===========================[Maia, what are you listening to?]=========================
====================================================================================*/
        else if(args[0] == 'what' && args[1] == 'are' && args[2] == 'you' && args[3] == 'listening' && (args[4] == 'to?' || args[4] == 'to')){
            message.channel.send("One of my favs 🎵 \n" + youtubeLink);
        }
/*====================================================================================
=============================COMMAND #5 - MAIA'S HEALTH===============================
================================[Maia, are you okay?]=================================
====================================================================================*/
        else if(args[0] == 'are' && args[1] == 'you' && (args[2] == 'ok' || args[2] == 'okay' || args[2] == 'k' || args[2] == 'ok?' || args[2] == 'okay?' || args[2] == 'k?')){
            message.channel.send("Yes I'm fine, thank you :)");
        }
/*====================================================================================
=============================COMMAND #6 - GET MAIA PROFILE============================
===================================[Maia, who are you?]===============================
====================================================================================*/
        else if(args[0] == 'who' && args[1] == 'are' && (args[4] == 'you' || args[4] != 'you?')){
            fetch('https://xivapi.com/character/20350668?data=CJ,FC')
            .then(response => response.json())
            .then(result => { 
                let newResult = result;
                processPlayerProfile(newResult, message);
            })
            message.channel.send("I'll just show you...");
        }
/*====================================================================================
=============================COMMAND #7 - LIST SERVERS================================
==============================[Maia, find all servers]================================
====================================================================================*/
        else if(args[0] == 'find' && args[1] == 'all' && (args[4] == 'servers' || args[4] != 'datacenters')){
            fetch('https://xivapi.com/servers/dc')
            .then(response => response.json())
            .then(result => { 
                //process the servers
                getServers(result);
                //display the server list
                message.reply("I'll send you a list! :)")
                message.author.send('Here they are :)');
                let embed = new Discord.MessageEmbed()
                .setTitle('Servers & Datacenters')
                .setColor(0xA569BD)
                .addField('Chaos (European Data Center)' + Servers.Chaos + "\n", 'Light (European Data Center)' + Servers.Light)
                .addField('Aether (North American Data Center)' + Servers.Aether + "\n", 'Crystal (North American Data Center)' + Servers.Crystal)
                .addField('Primal (North American Data Center)' + Servers.Primal + "\n", 'Elemental (Japanese Data Center)' + Servers.Elemental)
                .addField('Gaia (Japanese Data Center)' + Servers.Gaia + "\n", 'Mana (Japanese Data Center)' + Servers.Mana)
                message.author.send(embed);
             })
        }
/*====================================================================================
=============================COMMAND #8 - LINK WEBSITE================================
==================[Maia, find my website ('The DM' role only)]========================
====================================================================================*/
        else if(args[0] == 'find' && args[1] == 'my' && (args[2] == 'world' || args[2] == 'website')){
            if(message.member.roles.cache.find(role => role.name === "The DM")){
                message.channel.send("https://thorczhia.com/");
            }
            else{
                message.reply("You're not the DM!");
            }
        }
/*====================================================================================
=============================COMMAND #9 - REACTIONS===================================
==========================[Maia, you are X (flattery)]================================
====================================================================================*/
        else if(args[0] == 'you' && args[1] == 'are' && args[2] != null){
            switch(args[2]){
                case "cute":
                    message.react("❤️");
                    break;
                case "cool":
                    message.react("😎");
                    break;
                case "awesome":
                    message.react("🥰");
                    break;
            }
        }
/*====================================================================================
=============================COMMAND #10 - CREATE POLL================================
===================[Maia, create poll X (option A) Y (option B)]======================
====================================================================================*/
        else if(args[0] == "create" && args[1] == "poll" && args[2] != null && args[3] != null){
            pollOptionA = capitalizeFirstLetter(args[2]);
            pollOptionB = capitalizeFirstLetter(args[3]);
            let embed = new Discord.MessageEmbed()
            .setTitle('Poll initiated by ' + message.author.username)
            .addField('1. ' + pollOptionA, 'To vote for this option react with 💰')
            .addField('2. ' + pollOptionB, 'To vote for this option react with 💪')
            .setColor(0xA569BD)
            .setThumbnail("https://cdn.discordapp.com/emojis/658062110965628938.png?v=1")
            message.channel.send(embed).then(messageReaction => {
                messageReaction.react('💰');
                messageReaction.react('💪');
                //message.delete(5000);
            });
        }
/*====================================================================================
=========================COMMAND #11 - DESTINY API TEST===============================
==================================[Maia, destiny]=====================================
====================================================================================*/
        else if(args[0] == "destiny"){
            fetch('https://www.bungie.net/Platform/User/GetBungieNetUserById/6335406/', {
                headers: { "X-API-Key": destinyApiKey }    
            })
                .then(response => response.json())
                .then(result => { console.log(result);
            })
        }
/*====================================================================================
=============================COMMAND #0 - DEFAULT COMMAND=============================
=======================[If Maia does not recognize the command]=======================
====================================================================================*/
        else{
            message.channel.send("Sorry, I didn't understand that :(");
        }
    }

/*====================================================================================
==================================CHANNEL REACTIONS===================================
=========[When interacting in certain channels, Maia will give reactions]=============
====================================================================================*/
    if (message.channel.name === "the-goblet") {
        message.react('👍');
    }
    else if(message.channel.name === "jojokes"){
        message.react('😂');
    }
    else if(message.channel.name === "work"){
        message.react('👍');
    }
})

/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
================================================================================================
=====================================FUNCTIONS==================================================
================================================================================================
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

/*====================================================================================
=====================[Capitalize the first letter of a string]========================
====================================================================================*/
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/*====================================================================================
========================[Fetch an item from the ffxiv api]============================
====================================================================================*/
function findItem(itemId, message){
    //fetch an answer
    fetch('https://xivapi.com/Item/' + itemId)
    .then(response => response.json())
    .then(result => {
        //process the answer
        let itemNullValues = 0; 
        ffxivItemData.ID = result.ID;
        ffxivItemData.Name = result.Name;
        if(result.Name == ""){
            ffxivItemData.Name = "No name.";
            itemNullValues++;
        }
        else{
            ffxivItemData.Name = result.Name;
        }
        if(result.Description_en == ""){
            ffxivItemData.Description = "No description.";
            itemNullValues++;
        }
        else{
            ffxivItemData.Description = result.Description_en;
        }
        ffxivItemData.Type = result.ItemKind.Name;
        ffxivItemData.Icon = 'https://xivapi.com/' + result.Icon;
        //the reply
        if(itemNullValues >= 2){
            message.channel.send("Unfortunately, that item id is empty :(");
        }
        else{
            message.channel.send("Here you go :)");
            let embed = new Discord.MessageEmbed()
            .setTitle(ffxivItemData.Name)
            .addField(ffxivItemData.Type, ffxivItemData.Description)
            .setImage(ffxivItemData.Icon)
            .setFooter('Item ID: ' + ffxivItemData.ID)
            .setColor(0xA569BD)
            return message.channel.send(embed);
        }
    })
}
/*====================================================================================
==================[Process a player profile from the ffxiv api]=======================
====================================================================================*/
function processPlayerProfile(result, message){
    //process the answer
    ffxivProfileData.ID = result.Character.ID;
    ffxivProfileData.Name = result.Character.Name;
    ffxivProfileData.Avatar = result.Character.Portrait; //.Avatar is another option
    ffxivProfileData.Server = result.Character.Server;
    ffxivProfileData.Datacenter = result.Character.DC;
    let classArgs = result.Character.ActiveClassJob.Name.split(' ');
    switch(classArgs.length){
        //the smallest string we can get is 3 (ie: "dancer / dancer")
        case 3:
            classArgs[0] = capitalizeFirstLetter(classArgs[0]);
            classArgs[2] = capitalizeFirstLetter(classArgs[2]);
            if(classArgs[0] == classArgs[2]){
                ffxivProfileData.ActiveClass = classArgs[0];
            }
            else{
                ffxivProfileData.ActiveClass = classArgs[0] + " / " +  classArgs[2];
            }
            break;
        //a case 4 could happen with some job names (ie: "conjurer / white mage")
        case 4:
            classArgs[0] = capitalizeFirstLetter(classArgs[0]);
            classArgs[2] = capitalizeFirstLetter(classArgs[2]);                                classArgs[0] = capitalizeFirstLetter(classArgs[0]);
            classArgs[3] = capitalizeFirstLetter(classArgs[3]);
            ffxivProfileData.ActiveClass = classArgs[0] + " / " +  classArgs[2] + " " + classArgs[3];
            break;
        //case 5 will happen on red mage and arcanist (ie: "red mage / red mage")
        case 5: 
            classArgs[0] = capitalizeFirstLetter(classArgs[0]);
            classArgs[1] = capitalizeFirstLetter(classArgs[1]);                                classArgs[0] = capitalizeFirstLetter(classArgs[0]);
            classArgs[3] = capitalizeFirstLetter(classArgs[3]);
            classArgs[4] = capitalizeFirstLetter(classArgs[4]);
            ffxivProfileData.ActiveClass = classArgs[0] + " " + classArgs[1] + " / " +  classArgs[3] + " " + classArgs[4];
            break;
    }
    ffxivProfileData.ClassLevel = result.Character.ActiveClassJob.Level;
    if(result.FreeCompany != null){
        ffxivProfileData.FreeCompany = result.FreeCompany.Name;
    }
    else{
        ffxivProfileData.FreeCompany = "-";
    }
    switch(result.Character.Gender){
        case 1: 
            ffxivProfileData.Gender = "Male";
            break;
        case 2: 
            ffxivProfileData.Gender = "Female";
            break;
    }
    switch(result.Character.Race){
        case 1: 
            ffxivProfileData.Race = "Hyur";
            break;
        case 2: 
            ffxivProfileData.Race = "Elezen";
            break;
        case 3: 
            ffxivProfileData.Race = "Lalafell";
            break;
        case 4: 
            ffxivProfileData.Race = "Miqo'te";
            break;
        case 5: 
            ffxivProfileData.Race = "Roegadyn";
            break;
        case 6: 
            ffxivProfileData.Race = "Au Ra";
            break;
        case 7: 
            ffxivProfileData.Race = "Hrothgar";
            break;
        case 8: 
            ffxivProfileData.Race = "Viera";
            break;
    }
    if(result.Character.GrandCompany != null){
        switch(result.Character.GrandCompany.NameID){
            case 1: 
                ffxivProfileData.GrandCompany = "The Maelstrom";
                break;
            case 2:
                ffxivProfileData.GrandCompany = "The Order of the Twin Adder";
                break;
            case 3:
                ffxivProfileData.GrandCompany = "The Immortal Flames";
                break;
        }
    }
    else{
        ffxivProfileData.GrandCompany = "-";
    }
    //get the character title name from id
    ffxivProfileData.TitleId = result.Character.Title;
    fetch('https://xivapi.com/title?limit=521')
    .then(response => response.json())
    .then(titleResult => { 
        ffxivProfileData.Title = titleResult.Results[ffxivProfileData.TitleId - 1].Name;
        //display a different message depending on which fetch we used
        if(numberOfResults > 1){
            message.channel.send("Is this who you were looking for? :)");
        }
        else{
            message.channel.send("Here you go :)");
        }
        //reset search results
        numberOfResults = 0;
        //display player profile
        let embed = new Discord.MessageEmbed()
        .setTitle(ffxivProfileData.Name)
        .addField(ffxivProfileData.Title, "Level " + ffxivProfileData.ClassLevel + " " + ffxivProfileData.ActiveClass)
        .addField(ffxivProfileData.Gender + " " + ffxivProfileData.Race, "Server: " + ffxivProfileData.Server + "\nDatacenter: " + ffxivProfileData.Datacenter)
        .addField("Grand Company: " + ffxivProfileData.GrandCompany, "Free Company: " + ffxivProfileData.FreeCompany)
        .setImage(ffxivProfileData.Avatar)
        .setFooter("Profile ID: " + ffxivProfileData.ID)
        .setColor(0xA569BD)
        return message.channel.send(embed);
    })
}
/*====================================================================================
====================[Process the servers from the ffxiv api]==========================
====================================================================================*/
function getServers(result){
    for(i = 0; i < result.Aether.length; i++){
        Servers.Aether = Servers.Aether + "\n" + result.Aether[i];
    }
    for(i = 0; i < result.Chaos.length; i++){
        Servers.Chaos = Servers.Chaos + "\n" + result.Chaos[i];
    }
    for(i = 0; i < result.Crystal.length; i++){
        Servers.Crystal = Servers.Crystal + "\n" + result.Crystal[i];
    }
    for(i = 0; i < result.Elemental.length; i++){
        Servers.Elemental = Servers.Elemental + "\n" + result.Elemental[i];
    }
    for(i = 0; i < result.Gaia.length; i++){
        Servers.Gaia = Servers.Gaia + "\n" + result.Gaia[i];
    }
    for(i = 0; i < result.Light.length; i++){
        Servers.Light = Servers.Light + "\n" + result.Light[i];
    }
    for(i = 0; i < result.Mana.length; i++){
        Servers.Mana = Servers.Mana + "\n" + result.Mana[i];
    }
    for(i = 0; i < result.Primal.length; i++){
        Servers.Primal = Servers.Primal + "\n" + result.Primal[i];
    }
}
/*====================================================================================
=====================[Display all commands inside an embed]===========================
====================================================================================*/
function showCommands(message){
    message.author.send("Here's a list of things you can ask of me :)");
    let embed = new Discord.MessageEmbed()
    .setTitle('Phrases')
    .addField('List all data centers and servers', '* find all servers')
    .addField('Search for a player profile', '* find player X (first name) Y (last name)')
    .addField('Search for a player profile on a specific server', '* find player X (first name) Y (last name) on Z (server name)')
    .addField('Search for a random item', '* find random item')
    .addField('Search for a specific item', '* find item X (item ID)')
    .addField('Display my profile', '* who are you?')
    .addField('Get a link to the song I am currently listening to', '* what are you listening to?')
    .setFooter("There's some other secret phrases too ;)")
    .setColor(0xA569BD)
    .setThumbnail("https://cdn.discordapp.com/emojis/654793362892783617.png?v=1")
    message.author.send(embed);
}

/*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
================================================================================================
=====================================LOGIN======================================================
================================================================================================
-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
bot.login(token);