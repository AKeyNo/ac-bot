const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Discord.Collection();

// puts every command into commandFiles
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// shows in console when online and time
client.once('ready', () => {
	console.log('Isabelle arrived at Residential Services!');

	var loginTime = new Date(Date.now());
	console.log('She arrived at ' + loginTime.toString() + '.');
});

// handles messages
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	// allows commands to be set as guild/server only
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	// allows commands to check if they need arguments or not
	// replys back the proper usage if needed
	if (command.args && !args.length) {
		let reply = `You didn't provide any argmuments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// handles cooldown for messages sent
	// default cooldown is 3 seconds
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if(now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);

		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


	// tries to execute the command
	// replys an error if something went wrong
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// needed for it to function
// token must be put inside config.json
client.login(token);