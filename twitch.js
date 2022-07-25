// Basic Twich chatbot components
const tmi = require('tmi.js');
const config = require('./config');
const client = new tmi.client(config.opts);

// Components for chat sound notifications
const sound = require('sound-play');
const path = require('path');
const marioCoinMp3 = path.join(__dirname, 'audio/SuperMarioCoin.mp3');

// Put all the chat commands into a list
const commands = {
    Dance: require('./commands/Dance'),
    Dice: require('./commands/Dice'),
    Discord: require('./commands/Discord'),
    Invader: require('./commands/Invader'),
    Log: require('./commands/Log'),
    Lurk: require('./commands/Lurk'),
    MidKnightHeroes: require('./commands/MidknightHeroes'),
    Raid: require('./commands/Raid'),
    Rigged: require('./commands/Rigged'),
    ShoutOut: require('./commands/ShoutOut'),
    Socials: require('./commands/Socials'),
    UserSpecific: require('./commands/UserSpecific'),
};

function init()
{
    // Register our event handlers (defined below)
    client.on('message', onMessageHandler);
    client.on('connected', onConnectedHandler);

    // Connect to Twitch:
    client.connect();
}

function RequestorIsKnownBot (msg)
{
    var isKnownBot = false;

    for(x in config.opts.channel_bots)
    {
        if(msg.requestorName === ('@' + config.opts.channel_bots[x]))
        {
            isKnownBot = true;
            break;
        }
    }
    
    return isKnownBot;
}

function RequestorIsChannelOwner (msg)
{
    var isChannelOwner = false;
    
    for(x in config.opts.channels)
    {
        var channelOwner = config.opts.channels[x];        

        if(msg.requestorName === channelOwner.replace('#', '@'))
        {
            isChannelOwner = true;
            break;
        }
    }

    return isChannelOwner;
}

function RequestorIsSelf (msg)
{
    return (msg.requestorName === config.opts.identity.username.replace(`#`, `@`));
}

function NotificationShouldBePlayed (msg)
{
    return (
        !RequestorIsKnownBot(msg) &&
        !RequestorIsChannelOwner(msg) &&
        !RequestorIsSelf(msg)
    );
}

// Called every time a message comes in
function onMessageHandler (target, tags, msgString, self) {
  if (self) { return; } // Ignore messages from the bot

  console.log(tags);
  console.log(target);
  // Create a structure that we can pass as a simplified argument
  var msg = {};
  msg[`client`] = client;
  msg[`target`] = target;
  msg[`requestorName`] = `@${tags.username}`;

  // Format the message and find the command (if any)
  var formattedMsgString = msgString.trim();
  msg[`word`] = formattedMsgString.split(" ");
  msg[`command`] = msg.word[0].toLowerCase();

  if(NotificationShouldBePlayed(msg))
  {
    sound.play(marioCoinMp3);
  }

  // Check if this followed command format.
  if(msg.command[0] === `!`)
  {
    var validCommand = false;
    for (x in commands)
    {
        console.log("Trying command: " + x);
        try
        {
            if(commands[x].MatchesMsgCommand(msg))
            {
                validCommand = true;
                console.log('executing command: ' + x);
                commands[x].ExecuteCommand(msg);
                break;
            }
        }
        catch(err)
        {
            console.log("Error at: " + x);
            console.log(err.message);
        }
    }

    if(!validCommand)
    {
        console.log(`* Unknown command: ` + msg.command);
    }
  }
//   else if()
}

function Wat(msg)
{
    client.say(msg.target, `Sorry ` + msg.requestorName + `, I didn't understand that command`);
}

function onConnectedHandler (addr, port) 
{
    console.log(`* Connected to ${addr}:${port}`);
}

module.exports = {
    init: init,
    onMessageHandler: onMessageHandler
}
