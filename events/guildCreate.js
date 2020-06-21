const mysql = require('mysql');

// when the bot joins a guild or server
module.exports = (client, guild) => {
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
    
    setGuildDBs(con, guild);
}

// sets up databases for each guild/server upon entering, MOVE THIS TO ITS OWN JS FILE TO BE RUN ONCE
function setGuildDBs(con, guild) {
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

    con.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Closed the database connection.');
    });
};