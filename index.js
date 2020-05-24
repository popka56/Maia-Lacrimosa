//Requires
const Discord = require('discord.js');
const fetch = require('node-fetch');
// get bot token from local file
const instance = require('./token.js');
let token = instance.getToken();

//Create our bot
const bot = new Discord.Client();
const prefix = 'Maia, ';

//declarations
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
    Bio: ""
}

let songName = '';
let youtubeLink = '';

let numberOfResults = 0;

//Set discord status on awake
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

//Behavior code goes here
bot.on('message', message => {
    // the message uses the prefix, or a variant of it
    if(message.content.startsWith(prefix) || message.content.startsWith('maia, ')){
        // split the message into an array called args for word for word specific commands
        let args = message.content.substring(prefix.length).split(' ');

        // ask Maia for her commands (Maia, what can you do? || Maia, what are your commands? || Maia, help)
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
        //find player (Maia, find player X Y)
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
                    message.channel.send("I found " + numberOfResults + " players with matching names!");
                }
                else{
                    message.channel.send("I couldn't find that person :(\nDid you misspell the name?");
                }
            })
            //while fetching ID
            message.channel.send('Alright, hold on...');
        }
        //find player on specific server (Maia, find player X Y on Z)
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
        // ask what she is listening to (Maia, what are you listening to?)
        else if(args[0] == 'what' && args[1] == 'are' && args[2] == 'you' && args[3] == 'listening' && (args[4] == 'to?' || args[4] == 'to')){
            message.channel.send("One of my favs 🎵 \n" + youtubeLink);
        }
        // ask if she is okay (Maia, are you okay?)
        else if(args[0] == 'are' && args[1] == 'you' && (args[2] == 'ok' || args[2] == 'okay' || args[2] == 'k' || args[2] == 'ok?' || args[2] == 'okay?' || args[2] == 'k?')){
            message.channel.send("Yes I'm fine, thank you :)");
        }
        //ask who Maia is
        else if(args[0] == 'who' && args[1] == 'are' && (args[4] == 'you' || args[4] != 'you?')){
            fetch('https://xivapi.com/character/20350668?data=CJ,FC')
            .then(response => response.json())
            .then(result => { 
                let newResult = result;
                processPlayerProfile(newResult, message);
            })
            message.channel.send("I'll just show you...");
        }
        //link to website (DM role only)
        else if(args[0] == 'find' && args[1] == 'my' && (args[2] == 'world' || args[2] == 'website')){
            if(message.member.roles.cache.find(role => role.name === "The DM")){
                message.channel.send("https://thorczhia.com/");
            }
            else{
                message.reply("You're not the DM!");
            }
        }
        //get some reactions
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
        //test
        else if(args[0] == "test"){
            fetch('https://results.dogpile.com/serp?qc=images&q=ffxiv')
            .then(response => response.json())
            .then(result => { 
                console.log(result);
            })
            message.channel.send("Let's test it!");
        }
        //if the command does not exist
        else{
            message.channel.send("Sorry, I didn't understand that :(");
        }
    }
})


//functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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
    if(!result.Character.Bio == "-"){
        ffxivProfileData.Bio = result.Character.Bio;
    }
    else{
        ffxivProfileData.Bio = "No bio.";
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
    .addField(ffxivProfileData.Bio, "Level " + ffxivProfileData.ClassLevel + " " + ffxivProfileData.ActiveClass)
    .addField(ffxivProfileData.Gender + " " + ffxivProfileData.Race, "Server: " + ffxivProfileData.Server + "\nDatacenter: " + ffxivProfileData.Datacenter)
    .addField("Grand Company: " + ffxivProfileData.GrandCompany, "Free Company: " + ffxivProfileData.FreeCompany)
    .setImage(ffxivProfileData.Avatar)
    .setFooter("Profile ID: " + ffxivProfileData.ID)
    .setColor(0xA569BD)
    return message.channel.send(embed);
}

//embed with list of commands (keep at the bottom of file)
function showCommands(message){
    message.author.send("Here's a list of things you can ask of me :)");
    let embed = new Discord.MessageEmbed()
    .setTitle('Phrases')
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

//Login to our bot
bot.login(token);
