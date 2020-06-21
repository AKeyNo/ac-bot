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

		let sql = `INSERT IGNORE INTO guildsettings(guildID) VALUES (${message.guild.id})`;
		con.query(sql, (err) => {
			if (err) {
				return console.error(err.message);
			}
			console.log(`A row has been found for ${message.guild.id}'s guild settings.`);
		});
	
		return message.say('Nothing to test right now.');
	}		


}
