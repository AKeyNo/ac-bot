module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	//args: true,
	guildOnly: true,

	execute(message, args) {
		message.channel.send('Pong.');
	},
};