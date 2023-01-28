function Execute(msg)
{
    console.log(`* Executed ` + msg.command + ` command`);
    msg.client.say(msg.target, "ExtraLife ⠀ ﾟ⠀*⠀ ｡⠀ ⠀ﾟ⠀｡ ⠀ ⠀⠀ ☆⠀ ⠀★⠀⠀⠀⠀⠀ ･ﾟ⠀ ⠀ ⠀ ★⠀ ｡･⠀⠀⠀ﾟ⠀⠀｡⠀ ⠀⠀⠀ ⠀ ★⠀ ⠀ ･･⠀⠀ ⠀ ∴⠀⠀ ⠀ ⠀ ⠀ ⠀ ⠀ ﾟ⠀ ⠀ ⠀ *⠀ﾟ⠀⠀⠀★⠀⠀⠀ ｡･⠀ ⠀⠀⠀⠀⠀⠀I CANT BELIEVE MY EYES 🔭 :O");
}

const userCommands = [ '!ufo', '!iwanttobelieve', `!alien`, '!aliens' ];

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
    ExecuteCommand: Execute,
    MatchesMsgCommand: IsValidCommand
}