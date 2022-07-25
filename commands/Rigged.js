function Rigged(msg)
{
    msg.client.say(msg.target, `It totally was, `+ msg.requestorName);
}


function IsValidCommand(msg)
{
    return (`!rigged` === msg.command);
}

module.exports = 
{
    ExecuteCommand: Rigged,
    MatchesMsgCommand: IsValidCommand
}