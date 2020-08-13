const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const connection = require("../../database/connection");

module.exports = class SailCommand extends Command {
    constructor(client) {
        super(client, {
			name: 'sail',
			aliases: ['search'],
			group: 'acsearch',
			memberName: 'sail',
			description: 'Sailing.',
			throttling: {
				usages: 1,
				duration: 10,
			},
			guildOnly: true,
        });
    }

    run(message) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#' + Math.floor(Math.random()*16777215).toString(16))
            .setTitle('VILLAGER')
            .setDescription('TYPE OF VILLAGER')
            .setThumbnail('https://dodoairlines.com/images/dodo-logo.png')
            .setImage('https://oyster.ignimgs.com/mediawiki/apis.ign.com/animal-crossing-new-horizons/7/75/Alfonso_NewLeaf.png?width=325')
            .setTimestamp()
            .setFooter('hmm');

        const filter = (reaction, user) => {
            return reaction.emoji.name === '👌' && user.id === message.author.id;
        };

        message.channel.send(exampleEmbed).then(sentEmbed => {
            sentEmbed.react('❤')
                .then();
        })
    }
}
