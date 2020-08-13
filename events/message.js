const chalk = require('chalk');
const connection = require("../database/connection");
const { prefix } = require('../config/config.json');

module.exports = (client, message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    else {
        checkUser(message);
    }
}

function checkUser(message) {
    let con = connection.setupConnection();

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