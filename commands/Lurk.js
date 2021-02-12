const Dice = require('./Dice');

// TODO: add cases for crits
function Lurk(msg)
{
    var userStealth = Dice.D(20);
    var chatPerception = Dice.D(20);
    var lurkMessage = msg.requestorName + ` rolls ` + userStealth.toString() + ` for stealth. Chat rolls ` + chatPerception.toString() + ` for perception. \n`;

    if(userStealth == 1)
    {
        if(chatPerception != 1)
        {
            lurkMessage += `BANG! CRASH! BOOM! ` + msg.requestorName + ` is like a bull in a china closet. That is not very good lurking.`;
        }
        else
        {
            lurkMessage += msg.requestorName + ` walks out in clear sight... but wait, where is chat? Aren't they supposed to be watching?`;
        }
    }
    else if(userStealth == 20)
    {
        if(chatPerception != 20)
        {
            lurkMessage += `CRIT! ` + msg.requestorName + ` is like a living shadow; unseen and unheard, lurking in the background.`;
        }
        else
        {
            lurkMessage += `CRIT! ` + msg.requestorName + ` ducks into the secret passage. But wait, who's that behind them? It's chat! They're onto ` + msg.requestorName + `'s plans!`;
        }

    }
    else if(userStealth > chatPerception)
    {
        lurkMessage +=  msg.requestorName + ` dissappears without a trace.`
    }
    else
    {
        lurkMessage += `Chat can see you, ` + msg.requestorName + `, but feel free to lurk.`;
    }

    msg.client.say(msg.target, lurkMessage);
}

function IsValidCommand(msg)
{
    return (msg.command === '!lurk')
}

module.exports = {
    ExecuteCommand: Lurk,
    MatchesMsgCommand: IsValidCommand,
}