const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const mysql = require('mysql');

module.exports = class AddOrDelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'addordel', memberName: 'addordel',
			aliases: ['aod'],
			group: 'dev',
			description: 'Adds to the database.',
			guildOnly: true,
			userPermissions: ['ADMINISTRATOR'],
			throttling: {
				usages: 1,
				duration: 10,
			},
			args: [
				{
					key: 'word',
					prompt: 'Add or delete?',
					type: 'string',
					// default: '',
				}
			]
		});
	}

	run(message, { word }) {
		let con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "",
			database: "acdb",
		});

		con.connect(err => {
			if (err) throw err;
			console.log("Connected to database.");
		});

		if (word == 'add') {
			let sql = `INSERT IGNORE INTO serverAnimals${message.guild.id}(userID) VALUES(?)`;

			con.query(sql, [message.author.id], function (err, result) {
				if (err) throw err;
				console.log(`A row for ${message.author.id} was created for ${message.guild.id}.`);
			});
		}
		else if (word == 'delete') {
			let sql = `DELETE FROM serverAnimals${message.guild.id} WHERE userID = ${message.author.id}`;

			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(`A row for ${message.author.id} was deleted for ${message.guild.id}.`);
			});
		}
	}
}
