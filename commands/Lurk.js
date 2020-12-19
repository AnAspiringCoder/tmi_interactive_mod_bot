const Dice = require('./Dice');

function Lurk(msg)
{
    var userStealth = Dice.D(20);
    var chatPerception = Dice.D(20);
    var lurkMessage = msg.requestorName + ` rolls ` + userStealth.toString() + ` for stealth. Chat rolls ` + chatPerception.toString() + ` for perception. \n`;

    if(userStealth > chatPerception)
    {
        lurkMessage +=  msg.requestorName + ` dissappears without a trace.`
    }
    else
    {
        lurkMessage += `Chat can see you, ` + msg.requestorName + `, but feel free to lurk.`;
    }

    msg.client.say(msg.target, lurkMessage);
}

module.exports = Lurk;