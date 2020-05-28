const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const sqlite = require('sqlite3').verbose();

module.exports = class CatchCommand extends Command {
    constructor(client) {
        super(client, {
			name: 'catch', memberName: 'catch',
			aliases: ['bug'],
			group: 'acsearch',
			description: 'Catch bugs.',
			throttling: {
				usages: 1,
				duration: 10,
			},
            guildOnly: true,
        });
    }

    run(message) {
        // initialize db
        let catchDB = new sqlite.Database(`./databases/catchdb.db`, sqlite.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            // console.log('Catching database is present.');
        });
        
    }
}		
