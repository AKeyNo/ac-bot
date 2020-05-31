const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const sqlite = require('sqlite3').verbose();

// 1 hour since last catch
const TIMEINTERVAL = 3600000;

module.exports = class CatchCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'catch', memberName: 'catch',
            aliases: ['bug'],
            group: 'acsearch',
            description: 'Catch bugs.',
            throttling: {
                usages: 1,
                duration: 10,
            },
            guildOnly: true,
        });
    }

    run(message) {
        // initialize db
        let catchDB = new sqlite.Database(`./databases/catchdb.db`, sqlite.OPEN_READWRITE, (err) => {
            if (err) {
                return console.error(err.message);
            }
            // console.log('Catching database is present.');
        });

        // check to see if the user is in the database, if not create them, else
        catchDB.serialize(() => {
            catchDB.get(`SELECT userID FROM server${message.guild.id} WHERE userID = ?`, [message.author.id], (err, row) => {
                // return error
                if (err) {
                    return console.error(err);
                };

                // add a row if the user is not present within the guild/server, else catch operations
                if (row === undefined) {
                    catchDB.serialize(() => {
                        catchDB.run(`INSERT INTO server${message.guild.id} DEFAULT VALUES`, function (err) {
                            if (err) {
                                return console.log(err.message);
                            }
                            console.log('Inserted a new row for catchDB');
                        });
                        catchDB.run(`UPDATE server${message.guild.id} SET userid = ? WHERE userid = ?`, [message.author.id, 0], function (err) {
                            if (err) {
                                return console.log(err.message);
                            }
                            console.log('Added new user.');
                        });
                    })
                }

                // retrieve last time and check to see if they are eligible
                catchDB.get(`SELECT lastTime FROM server${message.guild.id} WHERE userID = ?`, [message.author.id], (err, row) => {
                    if (row === undefined) {
                        return console.log('Something went wrong with grabbing lastTime.');
                    }
                    else {
                        let currentTime = new Date();

                        if ((row.lastTime + TIMEINTERVAL) > currentTime.getTime()) {
                            return message.say(`You can't catch any bugs right now.`);
                        }
                    }
                })

                // spawns a message with a reacting emoji that lasts 15 seconds, first 5 seconds can only be grabbed by the person who spawned
                // after anyone can try to catch for 10 seconds
                
            })
        })
    }
}

function bugCatching(db) {
    
};

function msToMinutesSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};