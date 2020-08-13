// Steps to producing a spawn message for catching fish.
// 1. Check to see if the author is eligible by checking the last time they tried to catch fish.
//      a.) If they aren't eligible, replay back saying how much more time until they are eligible and stop.
// 2. Get all the rows of fish that have status = 1 in the database which means they are available to be found in a random order.
//    Using the algorithm of grabbing the rows of available fish in ascending order and putting them into another array in
//    descending order based on their price while keeping track of the total. A temporary variable starting with 0 will be made then
//    we would Math.round(priceTable[x] * 100 / total) + 0 and store all the numbers into an odds array. With this, we will generate
//    a number between 1-100 inclusive andd see what index of the array has the lowest number that is greater than our random number.
//    A fish from the index of the original rows will be chosen. This is done so more costly a fish is, the lower chance it will be found,
//    while inexpensive fish would be more common.
//      a.) If the random number is greater, move on to the next fish having the rows roll over if they reach the end and repeat the process.
//      b.) If the random number is less than or equal, continue.
// 3. Spawn a message where only the original author can claim within the allowed amount of time COLLECTIONTIME in ms.
//      a.) If someone other than the author reacts, do nothing.
//      b.) If the author reacts under the allowed time, add this to their total amount of caught for the fish and update their lastFish.
//      c.) If the author does nothing within the allowed time, the fish swims away.

const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const connection = require("../../database/connection");

// 1 hour since last fished
const TIMEINTERVAL = 3600000;
// how much time the user has to react
const COLLECTIONTIME = 10000;

module.exports = class FishCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fish', memberName: 'fish',
            aliases: ['fishing', 'f'],
            group: 'acsearch',
            description: 'Fishing.',
            guildOnly: true,
        });
    }

    run(message) {
        // initialize db
        let con = connection.setupConnection();

        checkTime(con, message)
            .then(results => {
                //console.log(results[0].lastFish);
                let currentTime = new Date();
                if ((results[0].lastFish + TIMEINTERVAL) > currentTime.getTime()) {
                    message.reply(`you can't look for fish right now. You can look for them in ${msToMinutesSeconds((results[0].lastFish + TIMEINTERVAL) - currentTime.getTime())}.`);
                    throw `${message.author.tag} (${message.author.id}) can\'t look for fish right now.`
                }
                return pickRandom(con);
            })
            .then(row => {
                let selectedFish = row;
                console.log(selectedFish.name + ' was selected.');
                return spawnMessage(con, message, selectedFish);
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
                });
            });
    }
}

/**
 * Description: Grabs author's last time they did !fish.
 * Parameters: con: connection to the database, message: original message
 * Return: Returns lastFish for the author using promises.
 */
const checkTime = (con, message) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT lastFish from serveranimals${message.guild.id} WHERE userID = ${message.author.id}`;
        con.query(sql, (error, results) => {
            if (error) return reject(error);
            return resolve(results);
        })
    });
};

/**
 * Description: Picks a random fish from the list of available fish.
 * Parameters: con: connection to the database
 * Return: Returns a row of the selected fish using promises.
 */
const pickRandom = (con) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * from fish WHERE status = 1 ORDER BY price ASC`;
        let x = 0;
        con.query(sql, (error, rows) => {
            if (error) return reject(error);
            // console.log(results);

            //    Using the algorithm of grabbing the rows of available fish in ascending order and putting them into another array in
            //    descending order based on their price while keeping track of the total. A temporary variable starting with 0 will be made then
            //    we would Math.round(priceTable[x] * 100 / total) + 0 and store all the numbers into an odds array. With this, we will generate
            //    a number between 1-100 inclusive andd see what index of the array has the lowest number that is greater than our random number.
            //    A fish from the index of the original rows will be chosen. This is done so more costly a fish is, the lower chance it will be found,
            //    while inexpensive fish would be more common.
            let priceTable = [], odds = [];
            let total = 0;
            rows.forEach(function (row) {
                priceTable.push(row.price);
                total += row.price;
            });

            let temp = 0;
            for (var x = 0; x < priceTable.length; x++) {
                temp = Math.round(priceTable[x] * 100 / total) + temp;
                odds.push(temp);
            }
            priceTable.reverse();

            let roll = Math.floor(Math.random() * (100 - 1)) + 1;
            let flag = true;
            let index = 0;
            while (flag) {
                //console.log(`${roll} <= ${odds[index]}?`)
                if (roll <= odds[index]) {
                    flag = false;
                }
                else {
                    index++;
                }
            }
            //console.log(rows[index]);
            return resolve(rows[index]);
        })
    });
};

/**
 * Description: Spawns a timed fishing embed for the author to fish for the fish given using reactions.
 * Parameters: con: connection to the database, message: original message, selectedFish: row of the fish given
 * Return: N/A
 */
const spawnMessage = (con, message, selectedFish) => {
    return new Promise((resolve, reject) => {
        // embed for when it spawns
        const baseEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setImage(selectedFish.image)
            ;

        // embed if caught by the author
        const capturedEmbed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('CAUGHT')
            .setImage(selectedFish.image)
            .setFooter(`${message.author.username} caught a(n) ${selectedFish.name.toLowerCase()}!`)
            ;

        // embed if the fish wasn't caught
        const escapedEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setImage(selectedFish.image)
            .setFooter('*It swam away...*')
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
                        console.log(`${message.author.tag} (${message.author.id}) caught a ${selectedFish.name} in server${message.guild.id}!.`);
                    }
                    catch (error) { console.error(error); }
                }
            });

            // end reaction collector if time runs out or the author catches the fish
            collector.on('end', collected => {
                sentEmbed.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

                if (authorFlag) {
                    console.log(`${message.author.id} reacted to this message.`);

                    // update author's fish count for the fish
                    let sql = `UPDATE serveranimals${message.guild.id} SET \`${selectedFish.name}\` = \`${selectedFish.name}\` + 1 WHERE userID = ${message.author.id}`;
                    con.query(sql, (error, results, fields) => {
                        if (error) {
                            return console.error(error.message);
                        }
                        console.log(`Updated ${message.author.id}'s count.`);
                    });

                    // update author's lastFish to the current time in ms
                    sql = `UPDATE serveranimals${message.guild.id} SET lastFish = ${Date.now()} WHERE userID = ${message.author.id}`;
                    con.query(sql, (error, results, fields) => {
                        if (error) {
                            return console.error(error.message);
                        }
                        console.log(`Updated ${message.author.id}'s lastFish.`);
                    });

                    con.end(function (err) {
                        if (err) {
                            return console.log('error:' + err.message);
                        }
                        console.log('Closed the database connection.');
                    });
                }
                else {
                    // updates embed to escapedEmbed if the fish runs away
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
const msToMinutesSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);

    if (minutes > 0) {
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ' minutes';
    }
    else {
        return (seconds < 10 ? '0' : '') + seconds + ' seconds';
    }
};