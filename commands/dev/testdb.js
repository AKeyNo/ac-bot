const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const mysql = require('mysql');

module.exports = class TestDBCommand extends Command {
    constructor(client) {
        super(client, {
			name: 'testdb', memberName: 'testdb',
			aliases: ['test'],
			group: 'acsearch',
			description: 'Tests database stuff.',
			guildOnly: true,
			userPermissions: ['ADMINISTRATOR'],
			throttling: {
				usages: 1,
				duration: 2,
			},
        });
    }

    run(message, args) {
		return message.say('Nothing to test right now.');
	}		
}
