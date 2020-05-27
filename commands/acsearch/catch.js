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
        try { let catchDB = new sqlite.Database(`./databases/catchdb.db`, sqlite.OPEN_READWRITE); } 
        catch (error) { console.log(error); }

        
    }
}		
