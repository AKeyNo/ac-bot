const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const mysql = require('mysql');

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
		let con = connectDB();
	
	}		

}

function connectDB() {
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

	return con;
}