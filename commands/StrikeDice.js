function Red() {
    var redLookup = [ 0, 1, 1, 1, 1, 2 ];
    var side = Math.floor(Math.random() * 6);

    return redLookup[side];
}
function Blue() {
    var blueLookup = [ 0, 0, 1, 1, 1, 2 ];
    var side = Math.floor(Math.random() * 6);

    return blueLookup[side];
}
function White() {
    var whiteLookup = [ 0, 0, 0, 1, 1, 2 ];
    var side = Math.floor(Math.random() * 6);

    return whiteLookup[side];
}

function IsValidCommand(msg)
{
    var command = msg.command.replace(`!`, ``).toLowerCase();
    let re = /^(\d*(r|b|w)){1,}$/;

    return re.test(command);
}

function HandleDiceCommand(msg)
{
    var maxDice = 8;

    var command = msg.command.replace(`!`, ``);
    let re = /(\d{1}(r|b|w)){1}/g;
    var diceRolls = re[Symbol.match](command);
    var redDice = 0;
    var whiteDice = 0;
    var blueDice = 0;
    var redEntries = 0;
    var blueEntries = 0;
    var whiteEntries = 0;
    console.log(diceRolls);
    for(x in diceRolls)
    {
        console.log('\nx: ' + x + '\n');
        if(diceRolls[x][1] === 'r')
        {
            redDice = parseInt(diceRolls[x][0], 10);
            redEntries++;
        }
        else if(diceRolls[x][1] === 'w')
        {
            whiteDice = parseInt(diceRolls[x][0], 10);
            whiteEntries++;
        }
        else if(diceRolls[x][1] === 'b')
        {
            blueDice = parseInt(diceRolls[x][0], 10);
            blueEntries++;
        }
    }
    console.log(redDice + 'red ' + blueDice + 'blue ' + whiteDice + `white`);

    // Edge case handling
    if((redDice > maxDice) ||
    (blueDice > maxDice) || 
    (whiteDice > maxDice))
    {
        var edgeCaseMessage = `Sry, you can't roll more than ` + maxDice + ` of any color`;
        msg.client.say(msg.target, edgeCaseMessage);
    }
    else if((redEntries > 1) ||
            (blueEntries > 1) ||
            (whiteEntries > 1))
    {
        var edgeCaseMessage = `Sry, you specified a color of dice twice.`;
        msg.client.say(msg.target, edgeCaseMessage);
    }
    else
    {
        RollDice(redDice, blueDice, whiteDice, msg);
    }

}

function RollDice(redDice, blueDice, whiteDice, msg)
{
    var diceMessage = ``;
    var total = 0;
    
    diceMessage += msg.requestorName + ` rolled: `;
    if(redDice > 0)
    {
        diceMessage +=  ` ` + redDice + ` reds: (`;

        for(i=0; i < redDice; i++)
        {
            roll = Red();
            total += roll;
            diceMessage += roll.toString() + ` `; 
        }
        diceMessage += `), `
    } 

    if(blueDice > 0)
    {
        diceMessage += ` ` + blueDice + ` blues: (`;

        for(i=0; i < blueDice; i++)
        {
            roll = Blue();
            total += roll;
            diceMessage += roll.toString() + ` `; 
        }
        diceMessage += `)`
    } 

    if(whiteDice > 0)
    {
        diceMessage += ` ` + whiteDice + ` whites: (`;

        for(i=0; i < whiteDice; i++)
        {
            roll = White();
            total += roll;
            diceMessage += roll.toString() + ` `; 
        }
        diceMessage += `)`
    } 

    diceMessage +=`, for a total of: ` + total;
    
    msg.client.say(msg.target, diceMessage);
}


module.exports = {
    ExecuteCommand: HandleDiceCommand,
    MatchesMsgCommand: IsValidCommand,
};