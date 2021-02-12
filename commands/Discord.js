function Discord(msg)
{
    if(msg.target === "#aspirepainting")
    {
        msg.client.say(msg.target, `Sorry, there isn't a discord yet. Aspire hangs out in several different community discords though, so look around and you should find him.`);
    }
    else
    {
        //msg.client.say(msg.target, `/me is supposed to point you towards the discord, but it forgot what to say.`)
    }
}


function IsValidCommand(msg)
{
    return (`!discord` === msg.command);
}

module.exports = 
{
    ExecuteCommand: Discord,
    MatchesMsgCommand: IsValidCommand
}