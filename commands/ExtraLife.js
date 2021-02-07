function ExtraLifeLink(msg)
{
    message = "Thanks for considering donating: https://www.extra-life.org/participant/Aspire";
    msg.client.say(msg.target, message);
}

const userCommands = [ 'extralife', 'el', 'charity', 'donate' ];

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

module.exports = 
{
    ExecuteCommand: ExtraLifeLink,
    MatchesMsgCommand: IsValidCommand
}