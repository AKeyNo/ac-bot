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

    sql = "CREATE TABLE IF NOT EXISTS bugs(name VARCHAR(255) UNIQUE NOT NULL, price SMALLINT, rarity DECIMAL, status BOOLEAN DEFAULT FALSE, location VARCHAR(255), time VARCHAR(255), months VARCHAR(255), image VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Bugs table found.");
    });

    sql = "CREATE TABLE IF NOT EXISTS fish(name VARCHAR(255) UNIQUE NOT NULL, price SMALLINT, shadow TINYINT, status BOOLEAN DEFAULT FALSE, location VARCHAR(255), time VARCHAR(255), months VARCHAR(255), image VARCHAR(255))";
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
        ['Citrus Long-horned Beetle', 350, 0.1, 0, , , , 'https://i.imgur.com/RkMCLJy.png'],
        ['Common Bluebottle', 300, 0.7, 0, , , , 'https://i.imgur.com/bKjptkG.png'],
        ['Common Butterfly', 160, 0.6, 0, , , , 'https://i.imgur.com/0wq5hvU.png'],
        ['Cricket', 130, 0.6, 0, , , , 'https://i.imgur.com/KAIFJAJ.png'],
        ['Cyclommatus Stag', 8000, 0.02, 0, , , , 'https://i.imgur.com/MPEbOXJ.png'],
        ['Damselfly', 500, 0.6, 0, , , , 'https://i.imgur.com/E3YB9QK.png'],
        ['Darner Dragonfly', 230, 0.4, 0, , , , 'https://i.imgur.com/XeBdUqE.png'],
        ['Diving Beetle', 800, 0.1, 0, , , , 'https://i.imgur.com/MSBdgiy.png'],
        ['Drone Beetle', 200, 0.4, 0, , , , 'https://i.imgur.com/wuPfQB0.png'],
        ['Dung Beetle', 3000, 0.1, 0, , , , 'https://i.imgur.com/l8xLikP.png'],
        ['Earth-boring Dung Beetle', 300, 0.3, 0, , , , 'https://i.imgur.com/E9PgVq8.png'],
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
        ['Man-faced Stink Bug', 1000, 0.2, 0, , , , 'https://i.imgur.com/olA1I6M.png'],
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
        ['Queen Alexandra\'s Birdwing', 4000, 0.05, 0, , , , 'https://i.imgur.com/26KzgNY.png'],
        ['Rainbow Stag', 6000, 0.07, 0, , , , 'https://i.imgur.com/ZrcSUpc.png'],
        ['Rajah Brooke\'s Birdwing', 2500, 0.05, 0, , , , 'https://i.imgur.com/F7dktof.png'],
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
        console.log("Bugs list inserted.");
    });

    sql = "INSERT IGNORE INTO fish(name, price, shadow, status, location, time, months, image) VALUES ?";
    let fishList = [
        ['Anchovy', 200, 2, 0, 'Sea', '4 AM - 9 PM', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/C3SbAzh.png'],
        ['Angelfish', 3000, 2, 0, 'River', '4 PM - 9 AM', 'May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/PzyrNuH.png'],
        ['Arapaima', 10000, 6, 0, 'River', '4 PM - 9AM', 'Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/0i9uDJN.png'],
        ['Arowana', 10000, 3, 0, 'River', '4 PM - 9 AM', 'Jun Jul Aug Sep', 'https://i.imgur.com/0PLHXCK.png'],
        ['Barred Knifejaw', 5000, 3, 0, 'Sea', 'All Day', 'Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/7vSpW9b.png'],
        ['Barreleye', 15000, 3, 0, 'Sea', '9 PM - 4 AM', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/1DLqrAc.png'],
        ['Betta', 2500, 2, 0, 'River', '9 AM - 4 PM', 'May Jun Jul Aug Sep Oct', 'https://i.imgur.com/dqKhhaa.png'],
        ['Bitterling', 900, 1, 0, 'River', 'All Day', 'Jan Feb Mar Nov Dec', 'https://i.imgur.com/3VHt0JD.png'],
        ['Black Bass', 400, 4, 0, 'River', 'All Day', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/GWCDD8b.png'],
        ['Blowfish', 5000, 3, 0, 'Sea', '9 PM - 4 AM', 'Jan Feb Nov Dec', 'https://i.imgur.com/5XbQNsB.png'],
        ['Blue Marlin', 10000, 6, 0, 'Pier', 'All Day', 'Jan Feb Mar Apr Jul Aug Sep Nov Dec', 'https://i.imgur.com/XrNZhVt.png'],
        ['Bluegill', 180, 2, 0, 'River', '9 AM - 4 PM', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/7QcbY5F.png'],
        ['Butterfly Fish', 1000, 2, 0, 'Sea', 'All Day', 'Apr May Jun Jul Aug Sep', 'https://i.imgur.com/HIcHB8s.png'],
        ['Carp', 300, 4, 0, 'Pond', 'All Day', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/bnxZLEa.png'],
        ['Catfish', 300, 4, 0, 'Pond', '4 PM - 9 AM', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/9XO9HAb.png'],
        ['Char', 3800, 3, 0, 'River', '4 PM - 9 AM', 'Mar Apr May Jun Sep Oct Nov', 'https://i.imgur.com/zcB3DDf.png'],
        ['Cherry Salmon', 1000, 3, 0, 'River', '4 PM - 9 AM', 'Mar Apr May Jun Sep Oct Nov', 'https://i.imgur.com/undefined.png'],
        ['Clown Fish', 650, 1, 0, 'Sea', 'All Day', 'Apr May Jun Jul Aug Sep', 'https://i.imgur.com/06GF4Xbg.png'],
        ['Coelacanth', 15000, 6, 0, 'Sea', 'All Day', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/yWrTL8a.png'],
        ['Crawfish', 200, 2, 0, 'Pond', 'All Day', 'Apr May Jun Jul Aug Sep', 'https://i.imgur.com/CSV43HF.png'],
        ['Crucian Carp', 160, 2, 0, 'River', 'All Day', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/88geiDD.png'],
        ['Dab', 300, 3, 0, 'Sea', 'All Day', 'Jan Feb Mar Apr Oct Nov Dec', 'https://i.imgur.com/ATLllOG.png'],
        ['Dace', 240, 3, 0, 'River', '4 PM - 9 AM', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/mKGbBT9.png'],
        ['Dorado', 15000, 5, 0, 'River', '4 AM - 9 PM', 'Jun Jul Aug Sep', 'https://i.imgur.com/ayDmLMU.png'],
        ['Football Fish', 2500, 4, 0, 'Sea', '4 PM - 9 AM', 'Jan Feb Mar Nov Dec', 'https://i.imgur.com/undefined.png'],
        ['Freshwater Goby', 400, 2, 0, 'River', '4 PM - 9 AM', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/cWP2XfH.png'],
        ['Frog', 120, 2, 0, 'Pond', 'All Day', 'May Jun Jul Aug', 'https://i.imgur.com/NvRhShG.png'],
        ['Gar', 6000, 5, 0, 'Pond', '4 PM - 9 AM', 'Jun Jul Aug Sep', 'https://i.imgur.com/hSCe7gu.png'],
        ['Giant Snakehead', 5500, 5, 0, 'Pond', '9 AM - 4 PM', 'Jun Jul Aug', 'https://i.imgur.com/b1pmsqB.png'],
        ['Giant Trevally', 4500, 5, 0, 'Pier', 'All Day', 'May Jun Jul Aug Sep Oct', 'https://i.imgur.com/2kLnVI8.png'],
        ['Golden Trout', 15000, 3, 0, 'River', '4 PM - 9 AM', 'Mar Apr May Sep Oct Nov', 'https://i.imgur.com/0U2WcpI.png'],
        ['Goldfish', 1300, 1, 0, 'Pond', 'All Day', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/xOGca9N.png'],
        ['Great White Shark', 15000, 6, 0, 'Sea', '4 PM - 9 AM', 'Jun Jul Aug Sep', 'https://i.imgur.com/0ogZ3W7.png'],
        ['Guppy', 1300, 1, 0, 'River', '9 AM - 4PM', 'Apr May Jun Jul Aug Sep Oct Nov', 'https://i.imgur.com/K3eKXgl.png'],
        ['Hammerhead Shark', 8000, 6, 0, 'Sea', '4 PM - 9 AM', 'Jun Jul Aug Sep', 'https://i.imgur.com/5eKplav.png'],
        ['Horse Mackerel', 150, 2, 0, 'Sea', 'All Day', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/tPJb69K.png'],
        ['Killifish', 300, 1, 0, 'Pond', 'All Day', 'Apr May Jun Jul Aug', 'https://i.imgur.com/d22VK0c.png'],
        ['King Salmon', 1800, 6, 0, 'River', 'All Day', 'Sep', 'https://i.imgur.com/s05EjpYg.png'],
        ['Koi', 4000, 4, 0, 'Pond', '4 PM  - 9 AM', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/ZzmAQ8k.png'],
        ['Loach', 400, 2, 0, 'River', 'All Day', 'Mar Apr May', 'https://i.imgur.com/2ar0Dbl.png'],
        ['Mahi-mahi', 6000, 5, 0, 'Pier', 'All Day', 'May Jun Jul Aug Sep Oct', 'https://i.imgur.com/a0gaxeP.png'],
        ['Mitten Crab', 2000, 2, 0, 'River', '4 PM - 9 AM', 'Sep Oct Nov', 'https://i.imgur.com/Wk70XAQ.png'],
        ['Moray Eel', 2000, 0, 0, 'Sea', 'All Day', 'Aug Sep Oct', 'https://i.imgur.com/fMydTFz.png'],
        ['Napoleonfish', 10000, 6, 0, 'Sea', '4 AM - 9 PM', 'Jul Aug', 'https://i.imgur.com/RoF0EHY.png'],
        ['Neon Tetra', 500, 1, 0, 'River', '9 AM - 4 PM', 'Apr May Jun Jul Aug Sep Oct Nov', 'https://i.imgur.com/opJhUcD.png'],
        ['Nibble Fish', 1500, 1, 0, 'River', '9 AM - 4 PM', 'May Jun Jul Aug Sep', 'https://i.imgur.com/KgLSV8R.png'],
        ['Oarfish', 9000, 6, 0, 'Sea', 'All Day', 'Jan Feb Mar Apr May Dec', 'https://i.imgur.com/y2KGQK5.png'],
        ['Ocean Sunfish', 4000, 6, 0, 'Sea', '4 AM - 9 PM', 'Jul Aug Sep', 'https://i.imgur.com/o0fO5if.png'],
        ['Olive Flounder', 800, 5, 0, 'Sea', 'All Day', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/YvRUy6s.png'],
        ['Pale Chub', 200, 1, 0, 'River', '9 AM - 4 PM', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/4WaLiDu.png'],
        ['Pike', 1800, 5, 0, 'River', 'All Day', 'Sep Oct Nov Dec', 'https://i.imgur.com/BIAGddg.png'],
        ['Piranha', 2500, 2, 0, 'River', '9 AM - 4 PM 9 PM - 4 AM', 'Jun Jul Aug Sep', 'https://i.imgur.com/dYuOMCJ.png'],
        ['Pond Smelt', 500, 2, 0, 'River', 'All Day', 'Jan Feb Dec', 'https://i.imgur.com/Rle8Dm0.png'],
        ['Pop-eyed Goldfish', 1300, 1, 0, 'Pond', '9 AM - 4 PM', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/S5EbkDC.png'],
        ['Puffer Fish', 250, 3, 0, 'Sea', 'All Day', 'Jul Aug Sep', 'https://i.imgur.com/fkljnZt.png'],
        ['Rainbowfish', 800, 1, 0, 'River', '9 AM - 4 PM', 'May Jun Jul Aug Sep Oct', 'https://i.imgur.com/X6cTHkn.png'],
        ['Ranchu Goldfish', 4500, 2, 0, 'Pond', '9 AM - 4 PM', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/GWuXZ3p.png'],
        ['Ray', 3000, 5, 0, 'Sea', '4 AM - 9 PM', 'Aug Sep Oct Nov', 'https://i.imgur.com/iASlGj1.png'],
        ['Red Snapper', 3000, 4, 0, 'Sea', 'All Day', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/2HxK6qd.png'],
        ['Ribbon Eel', 600, 0, 0, 'Sea', 'All Day', 'Jun Jul Aug Sep Oct', 'https://i.imgur.com/RVD8HFy.png'],
        ['Saddled Bichir', 4000, 4, 0, 'River', '9 PM - 4 AM', 'Jun Jul Aug Sep', 'https://i.imgur.com/CrC8Bjq.png'],
        ['Salmon', 700, 4, 0, 'River', 'All Day', 'Sep', 'https://i.imgur.com/8ctgCyC.png'],
        ['Saw Shark', 12000, 6, 0, 'Sea', '4 PM - 9 AM', 'Jun Jul Aug Sep', 'https://i.imgur.com/EiC4lHE.png'],
        ['Sea Bass', 400, 5, 0, 'Sea', 'All Day', 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec', 'https://i.imgur.com/5Zhtdg4.png'],
        ['Sea Butterfly', 1000, 1, 0, 'Sea', 'All Day', 'Jan Feb Mar Dec', 'https://i.imgur.com/PP4XXYI.png'],
        ['Sea Horse', 1100, 1, 0, 'Sea', 'All Day', 'Apr May Jun Jul Aug Sep Oct Nov', 'https://i.imgur.com/Up5Cnul.png'],
        ['Snapping Turtle', 5000, 4, 0, 'River', '9 PM - 4 AM', 'Apr May Jun Jul Aug Sep Oct', 'https://i.imgur.com/c42Mqlu.png'],
        ['Soft-shelled Turtle', 3750, 4, 0, 'River', '4 PM - 9 AM', 'Aug Sep', 'https://i.imgur.com/XnkvsgX.png'],
        ['Squid', 500, 3, 0, 'Sea', 'All Day', 'Jan Feb Mar Apr May Jun Jul Aug Dec', 'https://i.imgur.com/LKGBnJx.png'],
        ['Stringfish', 15000, 5, 0, 'River', '4 PM - 9 AM', 'Jan Feb Mar Dec', 'https://i.imgur.com/fWcWPzD.png'],
        ['Sturgeon', 10000, 6, 0, 'River', 'All Day', 'Jan Feb Mar Sep Oct Nov Dec', 'https://i.imgur.com/wKyEWV8.png'],
        ['Suckerfish', 1500, 6, 0, 'Sea', 'All Day', 'Jun Jul Aug Sep', 'https://i.imgur.com/2y420hg.png'],
        ['Surgeonfish', 1000, 2, 0, 'Sea', 'All Day', 'Apr May Jun Jul Aug Sep', 'https://i.imgur.com/ppZQ9fo.png'],
        ['Sweetfish', 900, 3, 0, 'River', 'All Day', 'Jul Aug Sep', 'https://i.imgur.com/fUVLiYD.png'],
        ['Tadpole', 100, 1, 0, 'Pond', 'All Day', 'Mar Apr May Jun Jul', 'https://i.imgur.com/Da9v742.png'],
        ['Tilapia', 800, 3, 0, 'River', 'All Day', 'Jun Jul Aug Sep Oct', 'https://i.imgur.com/ztguNps.png'],
        ['Tuna', 7000, 6, 0, 'Pier', 'All Day', 'Jan Feb Mar Apr Nov Dec', 'https://i.imgur.com/U5hJDYO.png'],
        ['Whale Shark', 13000, 6, 0, 'Sea', 'All Day', 'Jun Jul Aug Sep', 'https://i.imgur.com/X2OjPOP.png'],
        ['Yellow Perch', 300, 3, 0, 'River', 'All Day', 'Jan Feb Mar Oct Nov Dec', 'https://i.imgur.com/Z1N0wY9.png'],
        ['Zebra Turkeyfish', 500, 3, 0, 'Sea', 'All Day', 'Apr May Jun Jul Aug Sep Oct Nov', 'https://i.imgur.com/iat5n4s.png']
    ];

    con.query(sql, [fishList], (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Fish list inserted.");
    });

    con.end(function (err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
};

