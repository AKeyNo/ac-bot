const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class TunesCommand extends Command {
    constructor(client) {
        super(client, {
			name: 'tunes', memberName: 'tunes',
			aliases: ['tune'],
			group: 'acsearch',
			description: 'Nook net tunes.',
			throttling: {
				usages: 1,
				duration: 10,
			},
			guildOnly: true,
        });
    }

    run(message, args) {
		//
	}		
}
