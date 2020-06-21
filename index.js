const Commando = require('discord.js-commando');
const mysql = require('mysql');
const path = require('path');
const chalk = require('chalk');
const { prefix, token } = require('./config.json');
const cron = require('cron');


// makes randomizeGames occur at the top of every hour
const hourlyJob = new cron.CronJob('0 0 * * * *', () => {
    randomizeGames();
    console.log(chalk.magenta('\nGames have been randomized'));
});

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

//  https://discordapp.com/oauth2/authorize?client_id=693398612339589181&scope=bot&permissions=845888
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
        ['dev', 'Developmental']
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
    hourlyJob.start();
});

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
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    console.log(chalk.cyan(`${message.author.username}`) + `: "${message}"`);
    let sql = `INSERT IGNORE INTO serveranimals${message.guild.id}(userID) VALUES(${message.author.id})`;
    con.query(sql, function (err) {
        if (err) console.log(err);
    });
})

client.on('error', console.error);
client.login(token);

// randomizes catches and fish
function randomizeGames() {
    // minimum and maximum amount of available catches and fish
    const MIN = 10;
    const MAX = 20;

    let sql = 'UPDATE bugs SET status = 0';
    con.query(sql, function (err) {
        if (err) throw err;
        console.log('Bugs have been reset.');
    });

    sql = 'UPDATE fish SET status = 0';
    con.query(sql, function (err) {
        if (err) throw err;
        console.log('Fish have been reset.');
    });

    let countCatch = Math.floor(Math.random() * (MAX - MIN)) + MIN;
    let countFish = Math.floor(Math.random() * (MAX - MIN)) + MIN;
    console.log(`Types of bugs around: ` + chalk.green(`${countCatch}\n`) +
        `Types of fish around: ` + chalk.green(`${countFish}`));

    // updates bugs that are active
    sql = `UPDATE bugs SET status = 1 WHERE status = 0 ORDER BY RAND() LIMIT ${countCatch}`;
    con.query(sql, function (err) {
        if (err) throw err;
        console.log('Updated bugs.');
    });

    sql = `UPDATE fish SET status = 1 WHERE status = 0 ORDER BY RAND() LIMIT ${countFish}`;
    con.query(sql, function (err) {
        if (err) throw err;
        console.log('Updated fish.');
    });

    sql = `SELECT name FROM bugs WHERE status = 1`;
    con.query(sql, function (err, rows) {
        rows.forEach(function (row) {
            //console.log(row.name);
        })
        if (err) throw err;
    });

    sql = `SELECT name FROM fish WHERE status = 1`;
    con.query(sql, function (err, rows) {
        rows.forEach(function (row) {
            //console.log(row.name);
        })
        if (err) throw err;
    });
};

// sets up databases for each guild/server upon entering, MOVE THIS TO ITS OWN JS FILE TO BE RUN ONCE
function setGuildDBs(guild) {
    let sql = `CREATE TABLE IF NOT EXISTS serverAnimals${guild.id} LIKE templateGuildCollection`;
    con.query(sql, function (err) {
        if (err) throw err;
        console.log(`A database for ${guild.id} is present.`);
    });

    sql = `INSERT IGNORE INTO guildsettings(guildID) VALUES (${guild.id})`;
    con.query(sql, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been found for ${guild.id}'s guild settings.`);
    });

    
};