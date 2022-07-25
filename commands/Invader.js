function Invader(msg)
{
    msg.client.say(msg.target, `Watch out `+ msg.target.replace(`#`, `@`) + ` ! there is a stream invader behind you.`);
}


function IsValidCommand(msg)
{
    return (`!invader` === msg.command);
}

module.exports = 
{
    ExecuteCommand: Invader,
    MatchesMsgCommand: IsValidCommand
}