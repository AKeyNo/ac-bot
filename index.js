const Commando = require('discord.js-commando');
const path = require('path');
const { prefix, token } = require('./config.json');

const client = new Commando.Client({
    commandPrefix: prefix,
    owner: '189985219451944960',
    disableEveryone: true,
    unknownCommandResponse: true,
    // invite: '',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['acsearch', 'AC Search'],
        ['general', 'General'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        // help: false,
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

    client.once('ready', () => {
        var loginTime = new Date(Date.now());

        console.log(`Logged in as ${client.user.tag}! (${client.user.id})
                    \nIsabelle arrived at Residential Services!
                    \nShe arrived at ${loginTime.toString()}.`);
        client.user.setActivity('!help for commands');
    });
	
    client.on('error', console.error);
    client.login(token);