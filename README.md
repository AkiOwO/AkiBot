# AkiBot
Fun little Discord bot that I made for friends.
Has some generic commands for testing.

# Main Features:
With /time [datetime] [timezone] you can generate a timestamp to share in chat:
![grafik](https://user-images.githubusercontent.com/53384165/212971325-d3ca1a24-0b6c-4fd6-aaf7-5448562b8b9b.png)

# How to install:
1. Add token and clientId to the config.json file (guildId is only needed if you want to deploy your commands to one server)
2. Run `node deploy-commands.js` (comment/uncomment lines 25/26 depending on if you want to deploy your commands globally or for a specific server)
3. Run `node index.js`
4. Enjoy