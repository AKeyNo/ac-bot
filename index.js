const Commando = require('discord.js-commando');
const fs = require(`fs`)
const path = require('path');
const { prefix, token } = require('./config/config.json');

//  https://discordapp.com/oauth2/authorize?client_id=693398612339589181&scope=bot&permissions=845888
const client = new Commando.Client({
    commandPrefix: prefix,
    owner: '189985219451944960',
    disableEveryone: true,
    unknownCommandResponse: false,
    invite: 'https://discord.gg/6MAnY9z',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['acsearch', 'AC Search'],
        ['general', 'General'],
        ['dev', 'Developmental']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        // help: false,
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

fs.readdir(`./events/`, (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        if (!file.endsWith(`.js`)) return
        const event = require(`./events/${file}`)
        const eventName = file.split(`.`)[0]
        client.on(eventName, event.bind(null, client))
        delete require.cache[require.resolve(`./events/${file}`)]
    })
});

client.on('error', console.error);
client.login(token);