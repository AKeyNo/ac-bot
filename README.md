# ac-bot
Discord bot for animal crossing lovers. Features to be added include a gacha system and a way to track personal island and villager information.

## Requirements
- git - https://git-scm.com/download/
- Node.js 12.0.0 or higher - https://nodejs.org/en/download/

## Recommended Downloads
- Visual Studio Code - https://code.visualstudio.com/
- HeidiSQL - https://www.heidisql.com/download.php

## Installation
0. Clone the repository.
1. [Create a Discord bot](https://discordapp.com/developers/applications/me) and grab a token for your bot. Treat it like a password for the bot and keep it a secret.
2. Open `configEDITME.json` and paste your bot token. Change the file name to `config.json`.
3. Head to the main directory in a command prompt. Enter `npm install`. This will install all the required node modules.
4. Run `dbsetup.js` to set up the databases with `node dbsetup.js`. This only has to be done once but must be done prior to starting the bot for the first time.
5. To run the bot, head to the main directory in a command prompt and type `node index.js`.

## To-do
- Finish fishing.
- Finish sailing.
- ?