function ExtraLifeLink(msg)
{
    message = "Thank you for considering donating: https://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=56676";
    msg.client.say(msg.target, message);
}

const userCommands = [ '!extralife', '!el', '!charity', '!donate' ];

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