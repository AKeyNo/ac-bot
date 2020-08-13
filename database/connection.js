const mysql = require("mysql");

const setupConnection = () => {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "acdb",
  });

  con.connect((err) => {
    if (err) return console.error(err);
    console.log("Connected to database.");
  });

  return con;
};

module.exports = { setupConnection };
