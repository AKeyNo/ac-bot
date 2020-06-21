const chalk = require('chalk');
const mysql = require('mysql');
const { prefix } = require('../config.json');

module.exports = (client, message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    else {
        checkUser(message);
    }
}

function checkUser(message) {
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
    console.log(chalk.cyan(`${message.author.username}`) + `: "${message}"`);
    let sql = `INSERT IGNORE INTO serveranimals${message.guild.id}(userID) VALUES(${message.author.id})`;
    con.query(sql, function (err) {
        if (err) console.log(err);
    });

    con.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Closed the database connection.');
    });
}