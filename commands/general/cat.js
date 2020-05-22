const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			aliases: ['kitty'],
			group: 'general',
			memberName: 'cat',
			description: 'Shares a picture of a cat.',
			throttling: {
				usages: 1,
				duration: 10,
			},
			guildOnly: false,
		});
	}

	async run(message) {
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

        message.channel.send(file);
	}
}