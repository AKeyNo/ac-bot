const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const connection = require("../../database/connection");

module.exports = class TradeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'trade', memberName: 'trade',
			aliases: ['t'],
			group: 'acsearch',
			description: 'Trade with another user.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 60,
			},
			args: [
				{
					key: 'targetUser',
					prompt: 'Who would you like to trade with?',
					type: 'string',
				},
			]
		});
	}

	run(message, { targetUser }) {
		targetUser = targetUser.substring(3, targetUser.length - 1);
		console.log(targetUser);

		let con = connection.setupConnection();

		checkUser(message, con, targetUser)
			.then(isPresent => {
				if (!isPresent) {
					return message.reply('that user was not found! Maybe you misspelt it?');
				}
				message.reply('would you like to give a bug, fish, or villager to them?');
				return checkType(message, con, targetUser)
			})
			.then(results => {
				//adsf
			})
	}
}

const checkUser = (message, con, targetUser) => {
	return new Promise((resolve, reject) => {
		let sql = `SELECT * FROM serveranimals${message.guild.id} WHERE userID = ${targetUser}`;
		con.query(sql, (error, rows) => {
			if (error) return reject(error);
			return resolve(rows.length > 0);
		})
	});
};

const getItem = (message, con, targetUser) => {
	return new Promise((resolve, reject) => {
		message.reply('what would you like to trade? format bugfishorvillager#amount separated by commas for multiple');

		const filter = m => m.content.includes('discord') && m.author.id === message.author.id
		const collector = message.channel.createMessageCollector(filter, { time: 15000 });

		collector.on('collect', m => {
			console.log(`Collected ${m.content}`);
		});

		collector.on('end', collected => {
			console.log(`Collected ${collected.size} items`);
			return resolve(m.content);
		});
	});
}

const validateItem = (message, con, targetUser) => {
	return new Promise((resolve, reject) => {
		item = checkType(message, con, targetUser);
		console.log("what?");
		console.log(item);
		
	});
};


