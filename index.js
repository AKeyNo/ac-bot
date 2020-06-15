const Commando = require('discord.js-commando');
const path = require('path');
const { prefix, token } = require('./config.json');
const sqlite = require('sqlite3').verbose();
const chalk = require('chalk');

const mysql = require('mysql');

// amount of minutes before the tables get randomized;
const RANDOMIZERTIMER = 60;

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "acdb",
});

con.connect(err => {
    if (err) throw err;
    console.log("Connected to database.");
    con.query(`SHOW TABLES`, console.log);
});

// https://discord.com/oauth2/authorize?client_id=693398612339589181&scope=bot
const client = new Commando.Client({
    commandPrefix: prefix,
    owner: '189985219451944960',
    disableEveryone: true,
    unknownCommandResponse: false,
    invite: 'https://discord.gg/6MAnY9z',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['acsearch', 'AC Search'],
        ['general', 'General'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        // help: false,
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    var loginTime = new Date(Date.now());
    console.log(`\nLogged in as ` + chalk.yellowBright(`${client.user.tag}`) + `! (${client.user.id})\n` +
        chalk.yellowBright(`Isabelle`) + ` arrived at Residential Services!\n` +
        `She arrived at ` + chalk.blue(`${loginTime.toString()}` + `.\n`));
    client.user.setActivity('!help for commands');
});

// randomizes the tables after every hour
client.setInterval(function () {
    randomizeGames();
    console.log(chalk.magenta('\nGames have been randomized'));
}, RANDOMIZERTIMER * 60000);

// when the bot joins a guild or server
client.on('guildCreate', (guild) => {
    setGuildDBs(guild);
})

// when a person joins
client.on('guildMemberAdd', (member) => {
    console.log(chalk.cyan(`${member.displayName}`) + ` joined!`);
    let sql = `INSERT IGNORE INTO serverAnimals${member.guild.id}(userID) VALUES(?)`;

    con.query(sql, [member.id], function (err, result) {
        if (err) throw err;
        console.log(`A row for ${member.id} was created for ${member.guild.id}.`);
    });
})

// logs commands for testing purposes
client.on('message', (message) => {
    if (message.content.charAt(0) == `!`) {
        console.log(chalk.cyan(`${message.author.username}`) + `: "${message}"`);
    }
})

client.on('error', console.error);
client.login(token);

// randomizes catches and fish
function randomizeGames() {
    let catchArr = [];
    let fishArr = [];

    // minimum and maximum amount of available catches and fish
    const min = 10;
    const max = 20;

    let countCatch = Math.floor(Math.random() * (max - min)) + min;
    let countFish = Math.floor(Math.random() * (max - min)) + min;
    console.log(`Types of bugs around: ` + chalk.green(`${countCatch}\n`) +
        `Types of fish around: ` + chalk.green(`${countFish}`));

    // generates an array of random catches
    while (catchArr.length < countCatch) {
        // generates a random number from 0 - 79 inclusive
        let randomNum = Math.floor(Math.random() * 80);

        // checks to see if its in the array, and adds or rolls again
        if (catchArr.indexOf(allCatches[randomNum]) < 0) {
            catchArr.push(allCatches[randomNum]);
            //console.log(randomNum);
        }
        catchArr.sort();
    }

    let infoDB = new sqlite.Database(`./databases/info.db`, sqlite.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(chalk.greenBright('Information database is present.'));
    });

    // resets status of all bugs, then updates bugs that are active
    infoDB.serialize(() => {
        infoDB.run(`UPDATE bugs SET status = ? WHERE status = ?`, [0, 1], function (err) {
            if (err) {
                return console.error(err.message);
            }
        })

        for (var y = 0; y < catchArr.length; y++) {
            infoDB.run(`UPDATE bugs SET status = ? WHERE name = ?`, [1, catchArr[y]], function (err) {
                if (err) {
                    return console.error(err.message);
                }
            });
            // console.log(`${catchArr[y]} is now active.`);
        }
    });

    while (fishArr.length < countFish) {
        // generates a random number from 0 - 79 inclusive
        let randomNum = Math.floor(Math.random() * 80);

        // checks to see if its in the array, and adds or rolls again
        if (fishArr.indexOf(randomNum) < 0) {
            fishArr.push(randomNum); //******* */
        }
    }

    // close the catch database
    infoDB.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(chalk.redBright('Closed the claim database connection.'));
    });

    console.log(catchArr);
    //console.log(fishArr);
};

// sets up databases for each guild/server upon entering, MOVE THIS TO ITS OWN JS FILE TO BE RUN ONCE
function setGuildDBs(guild) {
    let sql = `CREATE TABLE IF NOT EXISTS serverAnimals${guild.id} LIKE templateGuildCollection`;

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`A database for ${guild.id} is present.`);
    });
}