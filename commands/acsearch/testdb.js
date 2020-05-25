const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const sqlite = require('sqlite3').verbose();

module.exports = class TunesCommand extends Command {
    constructor(client) {
        super(client, {
			name: 'testdb', memberName: 'testdb',
			aliases: ['test'],
			group: 'acsearch',
			description: 'Tests database stuff.',
			throttling: {
				usages: 1,
				duration: 2,
			},
			guildOnly: true,
        });
    }

    run(message, args) {
		let claimDB = new sqlite.Database(`././claimdb.db`, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
		claimDB.run(`CREATE TABLE IF NOT EXISTS server${message.guild.id}(userid INTEGER NOT NULL, username TEXT NOT NULL)`);
	}		
}
