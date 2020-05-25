const Commando = require('discord.js-commando');
const path = require('path');
const { prefix, token } = require('./config.json');
const sqlite = require('sqlite3').verbose();

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
        let claimDB = new sqlite.Database('./claimdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

        console.log(`Logged in as ${client.user.tag}! (${client.user.id})
                    \nIsabelle arrived at Residential Services!
                    \nShe arrived at ${loginTime.toString()}.`);
        client.user.setActivity('!help for commands');
        
    });
    
    // when a person joins, do this.
    client.on('guildMemberAdd', (member) => {
        console.log(`${member.displayName} joined!`);
    })

    // log messages for currently for testing purposes
    client.on('message', (message) => {
        console.log(`${message.author.username}: "${message}"`);
    })

    client.on('error', console.error);
    client.login(token);