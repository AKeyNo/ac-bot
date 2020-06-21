const cron = require('cron');
const chalk = require('chalk');
const mysql = require('mysql');

// makes randomizeGames occur at the top of every hour
const hourlyJob = new cron.CronJob('0 0 * * * *', () => {
    randomizeGames();
    console.log(chalk.magenta('\nGames have been randomized'));
});

module.exports = client => {
    var loginTime = new Date(Date.now());
    console.log(`\nLogged in as ` + chalk.yellowBright(`${client.user.tag}`) + `! (${client.user.id})\n` +
        chalk.yellowBright(`Isabelle`) + ` arrived at Residential Services!\n` +
        `She arrived at ` + chalk.blue(`${loginTime.toString()}` + `.\n`));
    client.user.setActivity('!help for commands');
    hourlyJob.start();
}

// randomizes catches and fish
function randomizeGames() {
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

    con.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Closed the database connection.');
    });
};