/** timer.js
 * 
 * Description: Replys to the user with their associated timers.
 */

const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const mysql = require('mysql');

// 1 hour since last catch
const TIMEINTERVAL = 3600000;

module.exports = class TimerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'timer', memberName: 'timer',
            aliases: ['time'],
            group: 'acsearch',
            description: 'Tests database stuff.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10,
            },
        });
    }

    run(message) {
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

        let timeText = 'here is a list of your timers:\n';
        checkCatch(con, message)
            .then(results => {
                timeText += results;
                return checkFish(con, message);
            })
            .then(results => {
                timeText += results;
                message.reply(timeText);
            })
            .catch(err => {
                return console.error(err);
            })
            .then(() => {
                con.end(function (err) {
                    if (err) {
                        return console.log('error:' + err.message);
                    }
                    console.log('Closed the database connection.');
                })
            });
    }
}

/**
 * Description: Gets whether or not the user can catch bugs.
 * Parameters: con: connection to the database, message: original message
 * Return: Returns a string if they can catch bugs.
 */
const checkCatch = (con, message) => {
    return new Promise((resolve, reject) => {
        let currentTime = new Date();
        let sql = `SELECT lastCatch from serveranimals${message.guild.id} WHERE userID = ${message.author.id}`;
        con.query(sql, (error, results) => {
            if (error) return reject(error);

            if ((results[0].lastCatch + TIMEINTERVAL) < currentTime.getTime()) {
                return resolve(`You can force a bug to spawn! (**!catch**)\n`);
            }
            else {
                let ms = (results[0].lastCatch + TIMEINTERVAL) - currentTime.getTime();
                return resolve(`${msToMinutesSeconds(ms)} **catch timer.**`);
            }
        })
    });
};

/**
 * Description: Gets whether or not the user can catch fish.
 * Parameters: con: connection to the database, message: original message
 * Return: Returns a string if they can catch fish.
 */
const checkFish = (con, message) => {
    return new Promise((resolve, reject) => {
        let currentTime = new Date();
        let sql = `SELECT lastFish from serveranimals${message.guild.id} WHERE userID = ${message.author.id}`;
        con.query(sql, (error, results) => {
            if (error) return reject(error);

            if ((results[0].lastFish + TIMEINTERVAL) < currentTime.getTime()) {
                return resolve(`\nYou can force a fish to spawn! (**!fish**)`);
            }
            else {
                let ms = (results[0].lastFish + TIMEINTERVAL) - currentTime.getTime();
                return resolve(`${msToMinutesSeconds(ms)} **fish timer.**`);
            }
        })
    });
};

/**
 * Description: Creates a readable time amount given milliseconds.
 * Parameters: millis: milliseconds
 * Return: MINUTES:SECONDS in a string format.
 */
const msToMinutesSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);

    if (minutes > 0) {
        return '**' + minutes + ":" + (seconds < 10 ? '0' : '') + seconds + '** minutes left for your';
    }
    else {
        return '**' + (seconds < 10 ? '0' : '') + seconds + '** seconds for your';
    }
};