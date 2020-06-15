const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const sqlite = require('sqlite3').verbose();

module.exports = class FishCommand extends Command {
    constructor(client) {
        super(client, {
			name: 'fish', memberName: 'fish',
			aliases: ['fishing'],
			group: 'acsearch',
			description: 'Fishing.',
			throttling: {
				usages: 1,
				duration: 10,
			},
            guildOnly: true,
            
            args: [
                {
                    key: 'place',
                    prompt: 'Where would you like to fish? (river, pond, sea)',
                    type: 'string',
                    // default: '',
                }]
        });
    }

    run(message, { place }) {
        // initialize db
        let fishDB = new sqlite.Database(`./databases/fishdb.db`, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
        fishDB.run(`CREATE TABLE IF NOT EXISTS server${message.guild.id}(userid INTEGER NOT NULL, word TEXT NOT NULL)`);
        // check to see the last time they went fishing
		switch (place) {
            case 'river':
                break;
            case 'pond':
                break;
            case 'sea':
                break;
            default:
                message.say(`<@${message.author.id}> that isn't a river, pond, or sea. Please try again.`);
        }
	}		
}
