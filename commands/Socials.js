// https://www.instagram.com/_aspirepainting/

function Socials(msg)
{
    msg.client.say(msg.target, `https://www.instagram.com/_aspirepainting/`);
}

const userCommands = [ '!links', '!socials', `!ig` ];

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
    ExecuteCommand: Socials,
    MatchesMsgCommand: IsValidCommand
}