function D(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function IsValidCommand(msg)
{
    var command = msg.command.replace(`!`, ``).toLowerCase();
    let re = /^-{0,}\d*d{1}-{0,}\d{1,}$/;

    return re.test(command);
}

function HandleDiceCommand(msg)
{
    var maxDice = 7;
    var maxSides = 101;

    var command = msg.command.replace(`!`, ``);
    var diceRoll = command.split('d');
    var numDice;
    var numSides = diceRoll[1];

    if(diceRoll[0] === '')
    {
        numDice = 1;
    }
    else
    {
        numDice = parseInt(diceRoll[0], 10);
    }

    // Limit the command in case people request crazy things
    if(numDice > maxDice)
    {
        msg.client.say(msg.target, `Yikes, ` + msg.requestorName + `! That's a lot of dice! (max dice allowed: ` + maxDice + `)`);
    }
    else if(numDice < 1)
    {
        msg.client.say(msg.target, `Roll a negative number of dice? Really, ` + msg.requestorName + `?`);
    }
    else if(numSides > maxSides)
    {
        msg.client.say(msg.target, `That dice geometry is too complex! Watch out, or you'll crash the chat bot, ` + msg.requestorName + `! (max sides allowed: ` + maxSides + `)`);
    }
    else if(numSides == 0)
    {
        msg.client.say(msg.target, msg.requestorName + ` rolled zero sided dice, and got... zero. Really, what else were you expecting for dice with no sides.`);
    }
    else if(numSides < 0)
    {
        msg.client.say(msg.target, `The negative sided dice is colapsing in upon itself, creating a spacial rift... This may be a problem, ` + msg.requestorName + `.`);
    }
    else // Intentional use case. Command is resonablly formatted, and we can print the answer
    {
        RollDice(numDice, numSides, msg);
    }
}

function RollDice(numDice, numSides, msg)
{
    var diceMessage = msg.requestorName + ` rolled ` + numDice + ` d`;
    
    if(numDice == 1)
    {
        diceMessage += numSides + ` and got: ` + D(numSides).toString();
    }
    else{
        diceMessage += numSides + `s and got: `;

        var total = 0;
        var roll = D(numSides);

        total += roll;
        diceMessage += roll.toString();
    
        for(i=1; i < numDice - 1; i++)
        {
            roll = D(numSides);
            total += roll;
            diceMessage += `, ` + roll.toString(); 
        }

        roll = D(numSides);
        total += roll;
        diceMessage += ` and ` + roll + `, for a total of: ` + total;
    }
    
    msg.client.say(msg.target, diceMessage);
    console.log(`* Executed dice command for ` + numDice + `d` + numSides);
}


module.exports = {
    ExecuteCommand: HandleDiceCommand,
    D: D,
    MatchesMsgCommand: IsValidCommand,
};