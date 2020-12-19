function Meleon(msg)
{
    var melonMessage = "You misread @craftmeleon's name. It's meleon, like a chameleon.";
    msg.client.say(msg.target, melonMessage);
}

function NotMeleon(msg)
{
    var melonMessage = "Sorry, " + msg.requestorName + ", only @craftmeleon is cool enough to tell people they mispronounced her username.";
    msg.client.say(msg.target, melonMessage);
}

module.exports = {
    Meleon: Meleon,
    NotMeleon: NotMeleon
}