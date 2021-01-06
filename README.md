# tmi_interactive_mod_bot
- An interactive mod bot built using the tmi twitch interface library

## Based on the Twitch IRC bot tutorial
- https://dev.twitch.tv/docs/irc 

## Setting up the bot:
- In general, you can follow the instructions in the above Twitch IRC tutorial
- Instead of the environmental variables being in bot.js, they have been moved to config.js file
- Additionally, alerts generated by new chat comments use the "sound-play" node module. To install `npm install sound-play`

## Running the bot:
cmd to run: node bot.js