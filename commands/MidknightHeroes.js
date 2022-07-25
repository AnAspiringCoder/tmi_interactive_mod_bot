function Log(msg)
{
    msg.client.say(msg.target, "Referal Link: https://www.midknightheroes.com/shop?ref=aspire");
}

const userCommands = [ '!mkh', '!midknight', `!heroes`, '!midknightheroes', '!chibi', '!superchibi' ];

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