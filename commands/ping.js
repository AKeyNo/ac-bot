module.exports = {
	name: 'ping',
	description: 'Ping!',
	//args: true,
	guildOnly: true,

	execute(message, args) {
		message.channel.send('Pong.');
	},
};