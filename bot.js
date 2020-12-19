const tmi = require('tmi.js');
const config = require('./config');
const ShoutOut = require('./commands/ShoutOut');
const Dice = require('./commands/Dice');
const Lurk = require('./commands/Lurk');
const Raid = require('./commands/Raid');
const TotallyAMelon = require('./commands/TotallyAMelon');

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

  // Check if this followed command format.
  if(msg.commandName[0] === `!`)
  {
    // Special case command handlers:
    if(Dice.IsDiceCommand(msg.commandName.replace(`!`, ``).toLowerCase()))
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
