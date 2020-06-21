const chalk = require('chalk');
const mysql = require('mysql');

module.exports = (client, member) => {
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

    console.log(chalk.cyan(`${member.displayName}`) + ` joined!`);
    let sql = `INSERT IGNORE INTO serverAnimals${member.guild.id}(userID) VALUES(?)`;

    con.query(sql, [member.id], function (err, result) {
        if (err) throw err;
        console.log(`A row for ${member.id} was created for ${member.guild.id}.`);
    });

    con.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Closed the database connection.');
    });
}