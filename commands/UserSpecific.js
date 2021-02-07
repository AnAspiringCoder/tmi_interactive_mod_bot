function NotAMelon(msg, validUser)
{
    var message;
    if(validUser)
    {
        message = "You misread @craftmeleon's name. It's meleon, like a chameleon.";
    }
    else
    {
        message = "Sorry, " + msg.requestorName + ", only @craftmeleon is cool enough to tell people they mispronounced her username.";
    }
    msg.client.say(msg.target, message);
}

const userCommands = 
[
    { user: 'craftmeleon', command: '!notamelon', foo: NotAMelon }
];

function IsValidCommand(msg)
{
    var valid = false;

    for(i = 0; i < userCommands.length; i++)
    {
        if(msg.command === userCommands[i].command)
        {
            valid = true;
            break;
        }
    }
    
    return valid;
}

function UserCommands(msg)
{
    for(i = 0; i < userCommands.length; i++)
    {
        if(msg.command === userCommands[i].command)
        {
            userCommands[i].foo(msg);
            break;
        }
    }
}

exports = {
    ExecuteCommand: UserCommands,
    MatchesMsgCommand: IsValidCommand,
}