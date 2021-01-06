const tmi = require('tmi.js');
const config = require('./config');
const ShoutOut = require('./commands/ShoutOut');
const Dice = require('./commands/Dice');
const Lurk = require('./commands/Lurk');
const Raid = require('./commands/Raid');
const TotallyAMelon = require('./commands/TotallyAMelon');
const sound = require('sound-play');
const path = require('path');
const marioCoinMp3 = path.join(__dirname, 'audio/SuperMarioCoin.mp3');

// Create a client with our options
const client = new tmi.client(config.opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

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
  msg[`commandName`] = msg.word[0];

  sound.play(marioCoinMp3);

  // Check if this followed command format.
  if(msg.commandName[0] === `!`)
  {
    // Special case command handlers:
    if(Dice.IsDiceCommand(msg))
    {
        Dice.HandleDiceCommand(msg);
    }
    else
    {
        // If the command is known, let's execute it
        switch(msg.commandName.toLowerCase()) 
        {
            case '!raid':
                Raid.RandomMessage(msg);
                Raid.StandardMessage(msg);
                break;

            case '!so':
                ShoutOut(msg);
                break;

            case `!lurk`:
                Lurk(msg);
                break;

            case `!notamelon`:
                if(tags['display-name'] === `craftmeleon`)
                {
                    TotallyAMelon.Meleon(msg);
                }
                else
                {
                    TotallyAMelon.NotMeleon(msg);
                }
                break;

            case `!ground`:
                client.say(msg.target, `Check out the super talented streamer @groundeffected ! He's artistically amazing in everything he does! Give his stream a follow over at twitch.tv/groundeffected`);
                break;

            case `!dance`:
                client.say(msg.target, `/me has no idea what's going on, but it starts dancing!`);
                break;

            case `!discord`:
                if(msg.target === "#aspiringly")
                {
                    client.say(msg.target, `Sorry, there isn't a discord yet. Aspiringly hangs out in several different community discords though, so look around and you should find him.`);
                }
                break;

            default:
                // Wat(msg);
                console.log(`* Unknown command ` + msg.commandName);
                break;
        }
    }
  }
}

function Wat(msg)
{
    client.say(msg.target, `Sorry ` + msg.requestorName + `, I didn't understand that command`);
}

function LogCommandExecution(msg)
{
    console.log(`* Executed ` + msg.commandName + ` command`);
}

function onConnectedHandler (addr, port) 
{
    console.log(`* Connected to ${addr}:${port}`);
}
