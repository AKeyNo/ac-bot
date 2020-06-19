// Steps to producing a spawn message for catching bugs.
// 1. Check to see if the author is eligible by checking the last time they tried to catch bugs.
//      a.) If they aren't eligible, replay back saying how much more time until they are eligible and stop.
// 2. Get all the rows of bugs that have status = 1 in the database which means they are available to be found in a random order.
//    Using the algorithm of generating a random integer between 1-100 inclusive and checking to see if it is <= (the bug's rarity * 100).
//      a.) If the random number is greater, move on to the next bug having the rows roll over if they reach the end and repeat the process.
//      b.) If the random number is less than or equal, continue.
// 3. Spawn a message where only the original author can claim within the allowed amount of time COLLECTIONTIME in ms.
//      a.) If someone other than the author reacts, do nothing.
//      b.) If the author reacts under the allowed time, add this to their total amount of caught for the bug and update their lastCatch.
//      c.) If the author does nothing within the allowed time, the bug runs away.

const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const mysql = require('mysql');

// 1 hour since last catch
const TIMEINTERVAL = 3600000;
// how much time the user has to react
const COLLECTIONTIME = 10000;

module.exports = class CatchCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'catch', memberName: 'catch',
            aliases: ['bug', 'c'],
            group: 'acsearch',
            description: 'Catch bugs.',
            guildOnly: true,
        });
    }

    run(message) {
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

        checkTime(con, message)
            .then(results => {
                //console.log(results[0].lastCatch);
                let currentTime = new Date();
                if ((results[0].lastCatch + TIMEINTERVAL) > currentTime.getTime()) {
                    message.reply(`you can't look for bugs right now. You can look for them in ${msToMinutesSeconds((results[0].lastCatch + TIMEINTERVAL) - currentTime.getTime())}.`);
                    throw `${message.author.tag} (${message.author.id}) can\'t look for bugs right now.`
                }
                return pickRandom(con);
            })
            .then(results => {
                let selectedBug = results;
                console.log(selectedBug[0].name + ' was selected.');
                return spawnMessage(con, message, selectedBug);
            })
            .catch(err => {
                con.end(function (err) {
                    if (err) {
                        return console.log('error:' + err.message);
                    }
                    console.log('Closed the database connection.');
                });
                return console.error(err);
            });
    }
}

/**
 * Description: Grabs author's last time they did !catch.
 * Parameters: con: connection to the database, message: original message
 * Return: Returns lastCatch for the author using promises.
 */
function checkTime(con, message) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT lastCatch from serveranimals${message.guild.id} WHERE userID = ${message.author.id}`;
        con.query(sql, (error, results) => {
            if (error) return reject(error);
            return resolve(results);
        })
    });
};

/**
 * Description: Picks a random bug from the list of available bugs.
 * Parameters: con: connection to the database
 * Return: Returns a row of the selected bug using promises.
 */
function pickRandom(con) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * from bugs WHERE status = 1 ORDER BY RAND()`;
        let x = 0;
        con.query(sql, (error, results) => {
            if (error) return reject(error);
            // console.log(results);

            // Using the algorithm of generating a random integer between 1-100 inclusive
            // and checking to see if it is <= (the bug's rarity * 100).
            // Retry if failed with the next bug.
            while (true) {
                let roll = Math.floor(Math.random() * (100 - 1)) + 1;
                console.log(`${roll} compare to ${results[x].rarity * 100}`);
                if (roll <= results[x].rarity * 100) {
                    console.log('Roll was successful.');
                    return resolve(results);
                }
                else {
                    x = (x + 1) % (results.length + 1);
                    console.log((x + 1) % (results.length + 1));
                    console.log('Roll was unsuccessful. Rolling again.');
                }
            }
        })
    });
};

/**
 * Description: Spawns a timed catching embed for the author to catch for the bug given using reactions.
 * Parameters: con: connection to the database, message: original message, selectedBug: row of the bug given
 * Return: N/A
 */
function spawnMessage(con, message, selectedBug) {
    return new Promise((resolve, reject) => {
        // embed for when it spawns
        const baseEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setImage(selectedBug[0].image)
            ;

        // embed if caught by the author
        const capturedEmbed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('CAUGHT')
            .setImage(selectedBug[0].image)
            .setFooter(`${message.author.username} caught a(n) ${selectedBug[0].name.toLowerCase()}!`)
            ;

        // embed if the bug wasn't caught
        const escapedEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setImage(selectedBug[0].image)
            .setFooter('*It ran away...*')
            ;

        const filter = (reaction, user) => {
            return reaction.emoji.name === '⭐' && user.id === message.author.id;
        };

        // spawns the baseEmbed
        // -> if caught, edit embed to capturedEmbed
        // -> if not caught, edit embed to escapedEmbed
        message.channel.send(baseEmbed).then(sentEmbed => {
            // flag for the original user
            let authorFlag = false;

            sentEmbed.react('⭐');
            const collector = sentEmbed.createReactionCollector(filter, { time: COLLECTIONTIME });

            // check reactions for the author
            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

                if (user.id = message.author.id) {
                    authorFlag = true;

                    try {
                        collector.stop();
                        sentEmbed.edit(capturedEmbed);
                        console.log(`${message.author.tag} (${message.author.id}) caught a ${selectedBug[0].name} in server${message.guild.id}!.`);
                    }
                    catch (error) { console.error(error); }
                }
            });

            // end reaction collector if time runs out or the author catches the bug
            collector.on('end', collected => {
                sentEmbed.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

                if (authorFlag) {
                    console.log(`${message.author.id} reacted to this message.`);

                    // update author's bug count for the bug
                    let sql = `UPDATE serveranimals${message.guild.id} SET \`${selectedBug[0].name}\` = \`${selectedBug[0].name}\` + 1 WHERE userID = ${message.author.id}`;
                    con.query(sql, (error, results, fields) => {
                        if (error) {
                            return console.error(error.message);
                        }
                        console.log(`Updated ${message.author.id}'s count.`);
                    });

                    // update author's lastCatch to the current time in ms
                    sql = `UPDATE serveranimals${message.guild.id} SET lastCatch = ${Date.now()} WHERE userID = ${message.author.id}`;
                    con.query(sql, (error, results, fields) => {
                        if (error) {
                            return console.error(error.message);
                        }
                        console.log(`Updated ${message.author.id}'s lastCatch.`);
                    });

                    con.end(function (err) {
                        if (err) {
                            return console.log('error:' + err.message);
                        }
                        console.log('Closed the database connection.');
                    });
                }
                else {
                    // updates embed to escapedEmbed if the bug runs away
                    try { sentEmbed.edit(escapedEmbed); }
                    catch (error) { console.error(error); }
                }
            })
        })
    });
}

/**
 * Description: Creates a readable time amount given milliseconds.
 * Parameters: millis: milliseconds
 * Return: MINUTES:SECONDS in a string format.
 */
function msToMinutesSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);

    if (minutes > 0) {
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ' minutes';
    }
    else {
        return (seconds < 10 ? '0' : '') + seconds + ' seconds';
    }
};