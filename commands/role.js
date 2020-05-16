module.exports = {
	name: 'role',
    description: 'a',
    args: true,
    usage: `<user> <role>`,

	execute(message, args) {
		message.channel.send('Pong.');
	},
};