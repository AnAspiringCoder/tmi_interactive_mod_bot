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
    ExtraLife: require('./commands/ExtraLife'),
    Lurk: require('./commands/Lurk'),
    Raid: require('./commands/Raid'),
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

  sound.play(marioCoinMp3);

  // Check if this followed command format.
  if(msg.command[0] === `!`)
  {
    var validCommand = false;
    for (x in commands)
    {
        if(commands[x].MatchesMsgCommand(msg))
        {
            validCommand = true;
            console.log('executing command: ' + x);
            commands[x].ExecuteCommand(msg);
            break;
        }
    }

    if(!validCommand)
    {
        console.log(`* Unknown command ` + msg.command);
    }
  }
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
