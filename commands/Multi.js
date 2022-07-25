// https://multistre.am/aspirepainting/jarrettsterrainminis/layout4/

function Multi(msg)
{
    message = "https://multistre.am/aspirepainting/Ksauce01/layout4/";
    msg.client.say(msg.target, message);
}

const userCommands = [ '!multi', '!duo', '!multistream', '!mysteriousvoice', '!costream', '!whodis' ];

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
    ExecuteCommand: Multi,
    MatchesMsgCommand: IsValidCommand
}