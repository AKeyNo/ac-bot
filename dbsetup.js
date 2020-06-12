// dbsetup.js
// Run this before starting the bot to set up all the databases.
// This only has to be ran one time.

const mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "acdb",
});

con.connect(err => {
    if (err) throw err;
    console.log("Connected to database.");
    generateDBs();
});

function generateDBs() {
    let sql = "CREATE DATABASE IF NOT EXISTS acdb";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("maindb is present.");
    });

    sql = "CREATE TABLE IF NOT EXISTS bugs(name VARCHAR(255) UNIQUE NOT NULL, price INT, rarity DECIMAL, status BOOLEAN DEFAULT FALSE, location VARCHAR(255), time VARCHAR(255), months VARCHAR(255), image VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Bugs table found.");
    });

    sql = "CREATE TABLE IF NOT EXISTS fish(name VARCHAR(255) NOT NULL, price INT, rarity DECIMAL, status BOOLEAN DEFAULT FALSE, location VARCHAR(255), time VARCHAR(255), months VARCHAR(255), image VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Fish table found.");
    });

    sql = "INSERT IGNORE INTO bugs(name, price, rarity, status, location, time, months, image) VALUES ?";
    let bugsList = [
        ['Agrias Butterfly', 3000, 0.05, 0, , , , 'https://i.imgur.com/jF3hXlD.png'],
        ['Ant', 80, 0.5, 0, , , , 'https://i.imgur.com/N2vM27J.png'],
        ['Atlas Moth', 3000, 0.05, 0, , , , 'https://i.imgur.com/vDY33IF.png'],
        ['Bagworm', 600, 0.5, 0, , , , 'https://i.imgur.com/YH99Rew.png'],
        ['Banded Dragonfly', 4500, 0.07, 0, , , , 'https://i.imgur.com/DvnBqGC.png'],
        ['Bell Cricket', 430, 0.6, 0, , , , 'https://i.imgur.com/QG8A7BA.png'],
        ['Blue Weevil Beetle', 800, 0.02, 0, , , , 'https://i.imgur.com/G71nFHm.png'],
        ['Brown Cicada', 250, 0.7, 0, , , , 'https://i.imgur.com/dp7yezS.png'],
        ['Centipede', 300, 0.3, 0, , , , 'https://i.imgur.com/mRjxyx4.png'],
        ['Cicada Shell', 10, 0.01, 0, , , , 'https://i.imgur.com/kFI2tfo.png'],
        ['Citrus Longhorned Beetle', 350, 0.1, 0, , , , 'https://i.imgur.com/RkMCLJy.png'],
        ['Common Bluebottle', 300, 0.7, 0, , , , 'https://i.imgur.com/bKjptkG.png'],
        ['Common Butterfly', 160, 0.6, 0, , , , 'https://i.imgur.com/0wq5hvU.png'],
        ['Cricket', 130, 0.6, 0, , , , 'https://i.imgur.com/KAIFJAJ.png'],
        ['Cyclommatus Stag', 8000, 0.02, 0, , , , 'https://i.imgur.com/MPEbOXJ.png'],
        ['Damselfly', 500, 0.6, 0, , , , 'https://i.imgur.com/E3YB9QK.png'],
        ['Darner Dragonfly', 230, 0.4, 0, , , , 'https://i.imgur.com/XeBdUqE.png'],
        ['Diving Beetle', 800, 0.1, 0, , , , 'https://i.imgur.com/MSBdgiy.png'],
        ['Drone Beetle', 200, 0.4, 0, , , , 'https://i.imgur.com/wuPfQB0.png'],
        ['Dung Beetle', 3000, 0.1, 0, , , , 'https://i.imgur.com/l8xLikP.png'],
        ['Earthboring Dung Beetle', 300, 0.3, 0, , , , 'https://i.imgur.com/E9PgVq8.png'],
        ['Emperor Butterfly', 4000, 0.05, 0, , , , 'https://i.imgur.com/PiSIJhj.png'],
        ['Evening Cicada', 550, 0.5, 0, , , , 'https://i.imgur.com/zs4wbpK.png'],
        ['Firefly', 300, 0.65, 0, , , , 'https://i.imgur.com/0ev4eb4.png'],
        ['Flea', 70, 0.05, 0, , , , 'https://i.imgur.com/8j5kReQ.png'],
        ['Fly', 60, 0.5, 0, , , , 'https://i.imgur.com/JyR4bB2.png'],
        ['Giant Cicada', 500, 0.5, 0, , , , 'https://i.imgur.com/3z7asmI.png'],
        ['Giant Stag', 10000, 0.05, 0, , , , 'https://i.imgur.com/wDLe50L.png'],
        ['Giant Water Bug', 2000, 0.05, 0, , , , 'https://i.imgur.com/Bnc8b9d.png'],
        ['Giraffe Stag', 12000, 0.01, 0, , , , 'https://i.imgur.com/Q0bsVL1.png'],
        ['Golden Stag', 12000, 0.01, 0, , , , 'https://i.imgur.com/zetutHc.png'],
        ['Goliath Beetle', 8000, 0.02, 0, , , , 'https://i.imgur.com/nOVxXBQ.png'],
        ['Grasshopper', 160, 0.6, 0, , , , 'https://i.imgur.com/NF64AEg.png'],
        ['Great Purple Emperor', 3000, 0.05, 0, , , , 'https://i.imgur.com/yKLfkHS.png'],
        ['Hermit Crab', 1000, 0.25, 0, , , , 'https://i.imgur.com/KO83Tip.png'],
        ['Honeybee', 200, 0.3, 0, , , , 'https://i.imgur.com/T1LzEOY.png'],
        ['Horned Atlas', 8000, 0.02, 0, , , , 'https://i.imgur.com/4RbnXYU.png'],
        ['Horned Dynastid', 1350, 0.35, 0, , , , 'https://i.imgur.com/1nqk1QT.png'],
        ['Horned Elephant', 8000, 0.02, 0, , , , 'https://i.imgur.com/m9p1IKa.png'],
        ['Horned Hercules', 12000, 0.01, 0, , , , 'https://i.imgur.com/CCYLZsC.png'],
        ['Jewel Beetle', 2400, 0.05, 0, , , , 'https://i.imgur.com/587NGcY.png'],
        ['Ladybug', 200, 0.4, 0, , , , 'https://i.imgur.com/Q4BPKwD.png'],
        ['Long Locust', 200, 0.5, 0, , , , 'https://i.imgur.com/bl9Igic.png'],
        ['Madagascan Sunset Moth', 2500, 0.05, 0, , , , 'https://i.imgur.com/Gy1bser.png'],
        ['Manfaced Stink Bug', 1000, 0.2, 0, , , , 'https://i.imgur.com/olA1I6M.png'],
        ['Mantis', 430, 0.3, 0, , , , 'https://i.imgur.com/dqlyeJW.png'],
        ['Migratory Locust', 600, 0.1, 0, , , , 'https://i.imgur.com/qROq33y.png'],
        ['Miyama Stag', 1000, 0.35, 0, , , , 'https://i.imgur.com/ybBRxEp.png'],
        ['Mole Cricket', 500, 0.3, 0, , , , 'https://i.imgur.com/5GqJCvF.png'],
        ['Monarch Butterfly', 140, 0.3, 0, , , , 'https://i.imgur.com/LbNCek1.png'],
        ['Mosquito', 130, 0.5, 0, , , , 'https://i.imgur.com/awV5DHx.png'],
        ['Moth', 130, 0.25, 0, , , , 'https://i.imgur.com/9XrORR0.png'],
        ['Orchid Mantis', 2400, 0.15, 0, , , , 'https://i.imgur.com/0oOFovX.png'],
        ['Paper Kite Butterfly', 1000, 0.2, 0, , , , 'https://i.imgur.com/cwCELiB.png'],
        ['Peacock Butterfly', 2500, 0.05, 0, , , , 'https://i.imgur.com/O8gKLkE.png'],
        ['Pill Bug', 250, 0.5, 0, , , , 'https://i.imgur.com/vvzo6A4.png'],
        ['Pondskater', 130, 0.3, 0, , , , 'https://i.imgur.com/Xghwhmt.png'],
        ['Queen Alexandras Birdwing', 4000, 0.05, 0, , , , 'https://i.imgur.com/26KzgNY.png'],
        ['Rainbow Stag', 6000, 0.07, 0, , , , 'https://i.imgur.com/ZrcSUpc.png'],
        ['Rajah Brookes Birdwing', 2500, 0.05, 0, , , , 'https://i.imgur.com/F7dktof.png'],
        ['Red Dragonfly', 180, 0.8, 0, , , , 'https://i.imgur.com/jwYH56M.png'],
        ['Rice Grasshopper', 160, 0.2, 0, , , , 'https://i.imgur.com/z66H9N1.png'],
        ['Robust Cicada', 300, 0.7, 0, , , , 'https://i.imgur.com/snisoWH.png'],
        ['Rosalia Batesi Beetle', 3000, 0.02, 0, , , , 'https://i.imgur.com/gxc8vJY.png'],
        ['Saw Stag', 2000, 0.2, 0, , , , 'https://i.imgur.com/JY1WU2r.png'],
        ['Scarab Beetle', 10000, 0.03, 0, , , , 'https://i.imgur.com/e2hyRmr.png'],
        ['Scorpion', 8000, 0.02, 0, , , , 'https://i.imgur.com/dB7hF1B.png'],
        ['Snail', 250, 0.2, 0, , , , 'https://i.imgur.com/QVdLSXA.png'],
        ['Spider', 480, 0.3, 0, , , , 'https://i.imgur.com/LzUswwa.png'],
        ['Stinkbug', 120, 0.4, 0, , , , 'https://i.imgur.com/zXKfms3.png'],
        ['Tarantula', 8000, 0.02, 0, , , , 'https://i.imgur.com/mD5JeLp.png'],
        ['Tiger Beetle', 1500, 0.15, 0, , , , 'https://i.imgur.com/wAfFous.png'],
        ['Tiger Butterfly', 240, 0.4, 0, , , , 'https://i.imgur.com/v9SDAj4.png'],
        ['Violin Beetle', 450, 0.1, 0, , , , 'https://i.imgur.com/YhXzbAf.png'],
        ['Walker Cicada', 400, 0.4, 0, , , , 'https://i.imgur.com/dB8D6fy.png'],
        ['Walking Leaf', 600, 0.1, 0, , , , 'https://i.imgur.com/MDzhwkU.png'],
        ['Walking Stick', 600, 0.1, 0, , , , 'https://i.imgur.com/oUQWek4.png'],
        ['Wasp', 2500, 0.5, 0, , , , 'https://i.imgur.com/SMPORh0.png'],
        ['Wharf Roach', 200, 0.2, 0, , , , 'https://i.imgur.com/bdBRdVb.png'],
        ['Yellow Butterfly', 160, 0.6, 0, , , , 'https://i.imgur.com/c4Xx1CL.png']
    ];

    con.query(sql, [bugsList], (err) => {
        if (err) {
            return console.error(err.message);
        }
        // get inserted rows
        console.log("Bugs list inserted.");
    });

    /* insert fish here
    sql = "INSERT IGNORE INTO fish(name, price, rarity, status, location, time, months, image) VALUES ?";
    let fishList = [];

        con.query(sql, [bugsList], (err) => {
        if (err) {
            return console.error(err.message);
        }
        // get inserted rows
        console.log("Bugs list inserted.");
    });
    */

    con.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
};

