const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const mysql = require('mysql');

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

	}		
}
