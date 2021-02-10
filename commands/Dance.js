const Dice = require("./Dice");

const randomMessageTable = 
[
    `/me has no idea what's going on, but it starts dancing!`,
    `$requestor wants to re-enact the movie Footloose. Let's show them how it's done!`,
];

function Dance(msg)
{
    var randomMessage = randomMessageTable[Dice.D(randomMessageTable.length) - 1];
    randomMessage = randomMessage.replace(`$requestor`, msg.requestorName);
    randomMessage = randomMessage.replace(`$target`, msg.target.replace(`#`, ``));

    msg.client.say(msg.target, randomMessage);
    // client.say(msg.target, `/me has no idea what's going on, but it starts dancing!`);
}

function IsValidCommand(msg)
{
    return (msg.command === `!dance`);
}

module.exports = {
    ExecuteCommand: Dance,
    MatchesMsgCommand: IsValidCommand
};