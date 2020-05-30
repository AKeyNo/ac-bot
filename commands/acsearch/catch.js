const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const sqlite = require('sqlite3').verbose();

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
            catchDB.get(`SELECT userid FROM server${message.guild.id} WHERE userID = ?`, [message.author.id], (err, row) => {
                // return error
                if (err) {
                    return console.error(err);
                };

                // add a row if the user is not present within the guild/server, else catch operations
                if (row === undefined) {
                    catchDB.serialize(() => {
                        catchDB.run(`INSERT INTO server${message.guild.id} DEFAULT VALUES`, function (err) {
                            if (err) {
                                return console.log(err.message + `insert error`);
                            }
                            console.log('Inserted a new row for catchDB');
                        });
                        catchDB.run(`UPDATE server${message.guild.id} SET userid = ? WHERE userid = ?`, [message.author.id, 1], function (err) {
                            if (err) {
                                return console.log(err.message);
                            }
                            console.log('Added new user.');
                        });
                    })
                }
                // else perform the catch operation
                else {
                    //
                }
            })
        })
    }
}
