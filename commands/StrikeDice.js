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
    var maxDice = 7;

    var command = msg.command.replace(`!`, ``);
    let re = /(\d{1}(r|b|w)){1}/g;
    var diceRolls = re[Symbol.match](command);
    var redDice = 0;
    var whiteDice = 0;
    var blueDice = 0;
    console.log(diceRolls);
    for(x in diceRolls)
    {
        console.log('\nx: ' + x + '\n');
        if(diceRolls[x][1] === 'r')
        {
            redDice = parseInt(diceRolls[x][0], 10);
        }
        else if(diceRolls[x][1] === 'w')
        {
            whiteDice = parseInt(diceRolls[x][0], 10);
        }
        else if(diceRolls[x][1] === 'b')
        {
            blueDice = parseInt(diceRolls[x][0], 10);
        }
    }
    console.log(redDice + 'red ' + blueDice + 'blue ' + whiteDice + `white`);

    RollDice(redDice, blueDice, whiteDice, msg);
}

function RollDice(redDice, blueDice, whiteDice, msg)
{
    var diceMessage = msg.requestorName + ` rolled: `;
    var total = 0;
    
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
    console.log('\nred done');

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
    console.log('\nblue done');

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
    console.log('\nwhite done');

    diceMessage +=`, for a total of: ` + total;
    
    msg.client.say(msg.target, diceMessage);
}


module.exports = {
    ExecuteCommand: HandleDiceCommand,
    MatchesMsgCommand: IsValidCommand,
};