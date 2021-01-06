const Dice = require("./Dice");

const randomMessageTable = 
[
    "The only thing that makes battle psychologically tolerable is the brotherhood among soldiers. You need each other to get by. - Sebastian Junger",
    "Any man's finest hour... is that moment when he has worked his heart out in a good cause and lies exhausted on the field of battle, victorious - Vince Lombardi",
    "In the midst of chaos, there is also opportunity - Sun Tzu",
    "There are not more than five musical notes, yet the combinations of these five give rise to more melodies than can ever be heard. - Sun Tzu",
    "Stand your ground men! Stand your ground! - The Princess Bride",
    "The most powerful weapon on earth is the human soul on fire. - Ferdinand Foch",
    "Victory comes from finding opportunities in problems - Sun Tzu",
];
function RandomMessage(msg)
{
    var randomMessage = randomMessageTable[Dice.D(randomMessageTable.length) - 1];

    msg.client.say(msg.target, randomMessage);
}

function StandardMessage(msg)
{
    var standardMessage = "";

    if(msg.word.length === 2)
    {
        var raidMaster = msg.word[1];
        standardMessage += `Thanks for the raid, ` + raidMaster + `! `;
    }

    standardMessage += `Welcome to the stream, everyone! Please click this link so Twitch recognizes you as an active viewer: twitch.tv/` + msg.target.replace(`#`, ``);
    
    msg.client.say(msg.target, standardMessage);
}

module.exports = {
    RandomMessage: RandomMessage,
    StandardMessage: StandardMessage
};