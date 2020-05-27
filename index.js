const Commando = require('discord.js-commando');
const path = require('path');
const { prefix, token } = require('./config.json');
const sqlite = require('sqlite3').verbose();

const client = new Commando.Client({
    commandPrefix: prefix,
    owner: '189985219451944960',
    disableEveryone: true,
    unknownCommandResponse: true,
    // invite: '',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['acsearch', 'AC Search'],
        ['general', 'General'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        // help: false,
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    var loginTime = new Date(Date.now());
    let claimDB = new sqlite.Database('./databases/claimdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    let catchDB = new sqlite.Database(`./databases/catchdb.db`, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    let fishDB = new sqlite.Database(`./databases/fishdb.db`, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

    console.log(`Logged in as ${client.user.tag}! (${client.user.id})
                    \nIsabelle arrived at Residential Services!
                    \nShe arrived at ${loginTime.toString()}.`);
    client.user.setActivity('!help for commands');

    randomizeGames();
});

// when the bot joins a guild or server
client.on('guildCreate', (guild) => {
    setGuildDBs(guild);
})

// when a person joins
client.on('guildMemberAdd', (member) => {
    console.log(`${member.displayName} joined!`);
})

// log messages for currently for testing purposes
client.on('message', (message) => {
    console.log(`${message.author.username}: "${message}"`);
})


client.on('error', console.error);
client.login(token);


function randomizeGames() {
    let catchDB = new sqlite.Database(`./databases/catchdb.db`, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    let fishDB = new sqlite.Database(`./databases/fishdb.db`, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    let catchArr = [];
    let fishArr = [];

    // minimum and maximum amount of available catches and fish
    const min = 10;
    const max = 20;

    let countCatch = Math.floor(Math.random() * (max - min)) + min;
    let countFish = Math.floor(Math.random() * (max - min)) + min;
    console.log(`Amount of available catches: ${countCatch}\n` +
                `Amount of available fish: ${countFish}`);

    // generates an array of random catches
    while (catchArr.length <= countCatch) {
        // generates a random number from 0 - 81
        let randomNum = Math.floor(Math.random() * 81);

        // checks to see if its in the array, and adds or rolls again
        if (catchArr.indexOf(randomNum) < 0) {
            catchArr.push(randomNum);
        }
    }

    // generates an array of random fish
    while (fishArr.length <= countFish) {
        // generates a random number from 0 - 81
        let randomNum = Math.floor(Math.random() * 81);

        // checks to see if its in the array, and adds or rolls again
        if (fishArr.indexOf(randomNum) < 0) {
            fishArr.push(randomNum);
        }

    }
};

function setGuildDBs(guild) {
    let claimDB = new sqlite.Database(`./databases/claimdb.db`, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    let catchDB = new sqlite.Database(`./database/catchdb.db`, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    let fishDB = new sqlite.Database(`./database/fishdb.db`, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

    // insert claimDB and fishDB

    catchDB.run(`CREATE TABLE IF NOT EXISTS server${guild.id}(
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
}