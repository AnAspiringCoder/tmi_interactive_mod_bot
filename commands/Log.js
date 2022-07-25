function Log(msg)
{
    msg.client.say(msg.target, "Hey, " + msg.target.replace(`#`, `@`)  + ", you should really write this recipe down in your log book!");
}

const userCommands = [ '!log', '!paintlog', `!recipe`, '!journal' ];

function IsValidCommand(msg)
{
    var matchesCommand = false;
    for(i = 0; i < userCommands.length; i++)
    {
        if(userCommands[i] == msg.command)
        {
            matchesCommand = true;
            break;
        }
    }
    return matchesCommand;
}


module.exports = {
    ExecuteCommand: Log,
    MatchesMsgCommand: IsValidCommand
};