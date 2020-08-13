const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const connection = require("../../database/connection");

module.exports = class GiftCommand extends Command {
    constructor(client) {
        super(client, {
			name: 'gift', memberName: 'gift',
			aliases: ['g'],
			group: 'acsearch',
			description: 'Give a gift to another user.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 60,
			},
        });
    }

    run(message, args) {
		let con = connection.setupConnection();
	
	}		

}