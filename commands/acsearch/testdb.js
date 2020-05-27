const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const sqlite = require('sqlite3').verbose();

module.exports = class TunesCommand extends Command {
    constructor(client) {
        super(client, {
			name: 'testdb', memberName: 'testdb',
			aliases: ['test'],
			group: 'acsearch',
			description: 'Tests database stuff.',
			throttling: {
				usages: 1,
				duration: 2,
			},
			guildOnly: true,
        });
    }

    run(message, args) {
		let claimDB = new sqlite.Database(`./databases/claimdb.db`, sqlite.OPEN_READWRITE  | sqlite.OPEN_CREATE);
        let catchDB = new sqlite.Database(`./databases/catchdb.db`, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
        let fishDB = new sqlite.Database(`./databases/fishdb.db`, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

		catchDB.run(`CREATE TABLE IF NOT EXISTS server${message.guild.id}(
			"userID"	INTEGER NOT NULL UNIQUE,
			"lastTime"	INTEGER,
			"Agrias Butterfly"	INTEGER NOT NULL DEFAULT 0,
			"Ant"	INTEGER NOT NULL DEFAULT 0,
			"Atlas Moth"	INTEGER NOT NULL DEFAULT 0,
			"Bagworm"	INTEGER NOT NULL DEFAULT 0,
			"Banded Dragonfly"	INTEGER NOT NULL DEFAULT 0,
			"Bell Cricket"	INTEGER NOT NULL DEFAULT 0,
			"Blue Weevil Beetle"	INTEGER NOT NULL DEFAULT 0,
			"Brown Cicada"	INTEGER NOT NULL DEFAULT 0,
			"Centipede"	INTEGER NOT NULL DEFAULT 0,
			"Cicada Shell"	INTEGER NOT NULL DEFAULT 0,
			"Citrus Longhorned Beetle"	INTEGER NOT NULL DEFAULT 0,
			"Common Bluebottle"	INTEGER NOT NULL DEFAULT 0,
			"Common Butterfly"	INTEGER NOT NULL DEFAULT 0,
			"Cricket"	INTEGER NOT NULL DEFAULT 0,
			"Cyclommatus Stag"	INTEGER NOT NULL DEFAULT 0,
			"Damselfly"	INTEGER NOT NULL DEFAULT 0,
			"Darner Dragonfly"	INTEGER NOT NULL DEFAULT 0,
			"Diving Beetle"	INTEGER NOT NULL DEFAULT 0,
			"Drone Beetle"	INTEGER NOT NULL DEFAULT 0,
			"Dung Beetle"	INTEGER NOT NULL DEFAULT 0,
			"Earthboring DungBeetle"	INTEGER NOT NULL DEFAULT 0,
			"Emperor Butterfly"	INTEGER NOT NULL DEFAULT 0,
			"Evening Cicada"	INTEGER NOT NULL DEFAULT 0,
			"Firefly"	INTEGER NOT NULL DEFAULT 0,
			"Flea"	INTEGER NOT NULL DEFAULT 0,
			"Fly"	INTEGER NOT NULL DEFAULT 0,
			"Giant Cicada"	INTEGER NOT NULL DEFAULT 0,
			"Giant Stag"	INTEGER NOT NULL DEFAULT 0,
			"Giant Water Bug"	INTEGER NOT NULL DEFAULT 0,
			"Giraffe Stag"	INTEGER NOT NULL DEFAULT 0,
			"Golden Stag"	INTEGER NOT NULL DEFAULT 0,
			"Goliath Beetle"	INTEGER NOT NULL DEFAULT 0,
			"Grasshopper"	INTEGER NOT NULL DEFAULT 0,
			"Great Purple Emperor"	INTEGER NOT NULL DEFAULT 0,
			"Hermit Crab"	INTEGER NOT NULL DEFAULT 0,
			"Honeybee"	INTEGER NOT NULL DEFAULT 0,
			"Horned Atlas"	INTEGER NOT NULL DEFAULT 0,
			"Horned Dynastid"	INTEGER NOT NULL DEFAULT 0,
			"Horned Elephant"	INTEGER NOT NULL DEFAULT 0,
			"Horned Herucles"	INTEGER NOT NULL DEFAULT 0,
			"Jewel Beetle"	INTEGER NOT NULL DEFAULT 0,
			"Ladybug"	INTEGER NOT NULL DEFAULT 0,
			"Long Locust"	INTEGER NOT NULL DEFAULT 0,
			"Madagascan SunsetMoth"	INTEGER NOT NULL DEFAULT 0,
			"Manfaced Stink Bug"	INTEGER NOT NULL DEFAULT 0,
			"Mantis"	INTEGER NOT NULL DEFAULT 0,
			"Migratory Locust"	INTEGER NOT NULL DEFAULT 0,
			"Miyama Stag"	INTEGER NOT NULL DEFAULT 0,
			"Mole Cricket"	INTEGER NOT NULL DEFAULT 0,
			"Monarch Butterfly"	INTEGER NOT NULL DEFAULT 0,
			"Mosquito"	INTEGER NOT NULL DEFAULT 0,
			"Moth"	INTEGER NOT NULL DEFAULT 0,
			"Orchid Mantis"	INTEGER NOT NULL DEFAULT 0,
			"Paper Kite Butterfly"	INTEGER NOT NULL DEFAULT 0,
			"Peacock Butterfly"	INTEGER NOT NULL DEFAULT 0,
			"Pill Bug"	INTEGER NOT NULL DEFAULT 0,
			"Pondskater"	INTEGER NOT NULL DEFAULT 0,
			"Queen Alexandras Birdwing"	INTEGER NOT NULL DEFAULT 0,
			"Rainbow Stag"	INTEGER NOT NULL DEFAULT 0,
			"RajaBrookes Birdwing"	INTEGER NOT NULL DEFAULT 0,
			"Red Dragonfly"	INTEGER NOT NULL DEFAULT 0,
			"Rice Grasshopper"	INTEGER NOT NULL DEFAULT 0,
			"Robust Cicada"	INTEGER NOT NULL DEFAULT 0,
			"Rosalia Batesi Beetle"	INTEGER NOT NULL DEFAULT 0,
			"Saw Stag"	INTEGER NOT NULL DEFAULT 0,
			"Scarab Beetle"	INTEGER NOT NULL DEFAULT 0,
			"Scorpion"	INTEGER NOT NULL DEFAULT 0,
			"Snail"	INTEGER NOT NULL DEFAULT 0,
			"Spider"	INTEGER NOT NULL DEFAULT 0,
			"Stinkbug"	INTEGER NOT NULL DEFAULT 0,
			"Tarantula"	INTEGER NOT NULL DEFAULT 0,
			"Tiger Beetle"	INTEGER NOT NULL DEFAULT 0,
			"Tiger Butterfly"	INTEGER NOT NULL DEFAULT 0,
			"Violin Beetle"	INTEGER NOT NULL DEFAULT 0,
			"Walker Cicada"	INTEGER NOT NULL DEFAULT 0,
			"Walking Leaf"	INTEGER NOT NULL DEFAULT 0,
			"Walking Stick"	INTEGER NOT NULL DEFAULT 0,
			"Wasp"	INTEGER NOT NULL DEFAULT 0,
			"Wharf Roach"	INTEGER NOT NULL DEFAULT 0,
			"Yellow Butterfly"	INTEGER NOT NULL DEFAULT 0,
			PRIMARY KEY("userID")
		)`);

		/*let userid = message.author.id;
		let claimDB = new sqlite.Database(`././test.db`, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
		let uname = message.author.tag;
		claimDB.run(`CREATE TABLE IF NOT EXISTS server${message.guild.id}(userid INTEGER NOT NULL, username TEXT NOT NULL, word TEXT NOT NULL)`);

		let query = `SELECT * FROM server${message.guild.id} WHERE userid = ?`;
		claimDB.get(query, [userid], (err, row) =>{
			if (err) {
				console.log(err);
				return;
			}

			if (row === undefined) {
				let insertdata = claimDB.prepare(`INSERT INTO server${message.guild.id} VALUES(?,?, ?)`);
				insertdata.run(userid, uname, "none");
				insertdata.finalize();
				claimDB.close();
				return;
			}
			else {
				let userid2 = row.userid;
				let username = row.username;
				console.log(username);
			}
		}
		)*/
	}		
}
