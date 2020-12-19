function ShoutOut(msg)
{
    var shoutOutMessage = "";
    if(msg.word.length < 2)
    {
        shoutOutMessage = `Sorry, ` + msg.requestorName + `, you didn't specify a valid target for that command.`;

        console.log(`* Failed execution of ` + msg.commandName + ` command. No target specified.`);
    }
    else
    {
        var shoutOutTarget = msg.word[1].replace(`@`, ``);
        shoutOutMessage = msg.requestorName + ` thinks you should go check out @` + shoutOutTarget + `'s channel. 
        Consider giving them a follow over at twitch.tv/` + shoutOutTarget;

        console.log(`* Executed ` + msg.commandName + ` command`);
    }

    msg.client.say(msg.target, shoutOutMessage);
}

module.exports = ShoutOut;