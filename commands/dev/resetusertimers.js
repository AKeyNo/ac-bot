const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const mysql = require('mysql');

module.exports = class ResetUserTimeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resetusertime', memberName: 'resetusertime',
            aliases: ['reset'],
            group: 'acsearch',
            description: 'Tests database stuff.',
            throttling: {
                usages: 1,
                duration: 2,
            },
            guildOnly: true,
            args: [
                {
                    key: 'input',
                    prompt: 'Would you like to reset your bug or fish timer?',
                    type: 'string',
                    default: 'both'
                },
            ],
        });
    }

    run(message, { input }) {
        let sql;
        switch (input) {
            case 'bug', 'bugs', 'catches':
                sql = `UPDATE serveranimals${message.guild.id} SET lastCatch = 0 WHERE userID = ${message.author.id}`;
                resetTime(sql)
                    .then(message.reply('your bug timer has been reset.'));
                break;
            case 'fish', 'fishes':
                sql = `UPDATE serveranimals${message.guild.id} SET lastFish = 0 WHERE userID = ${message.author.id}`;
                resetTime(sql)
                    .then(message.reply('your fish timer has been reset.'));
                break;
            case 'both':
                sql = `UPDATE serveranimals${message.guild.id} SET lastCatch = 0, lastFish = 0 WHERE userID = ${message.author.id}`;
                resetTime(sql)
                    .then(message.reply('your bug and fish timers have been reset.'));
                break;
            case 'guild', 'server':
                sql = `UPDATE serveranimals${message.guild.id} SET lastCatch = 0, lastFish = 0 WHERE userID = ${message.author.id}`;
                resetTime(sql)
                    .then(message.reply('your server\`s bug and fish timers have been reset.'));
                break;
            default:
                message.reply('Something went wrong.');
                break;
        };
    }
};

function resetTime(sql) {
    return new Promise((resolve, reject) => {
        // initialize db
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "acdb",
        });

        con.connect(err => {
            if (err) return console.error(err);
            console.log("Connected to database.");
        });

        con.query(sql, (error, results) => {
            if (error) return reject(error);
            con.end(function (err) {
                if (err) {
                    return console.log('error:' + err.message);
                }
                console.log('Closed the database connection.');
            });
            return resolve(results);
        });
    })
};