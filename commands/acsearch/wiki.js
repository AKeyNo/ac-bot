const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

const wiki = require('wikijs');

const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);


module.exports = class WikiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'wiki', memberName: 'wiki',
            aliases: ['wiki'],
			group: 'acsearch',
            guildOnly: false,
			description: 'Grabs definitions from urban dictionary.',
			throttling: {
				usages: 1,
				duration: 10,
            },
            args: [
                {
                    key: 'word',
                    prompt: 'Who do you want to look up?',
                    type: 'string',
                    // default: '',
                }
            ]
		});
	}

	async run(message, { word }) {

        new Wiki(search(word, 1))

		const embed = new MessageEmbed()
            .setColor('#EFFF00')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Name', value: trim(answer.title, 1024) },
                //{ name: 'Example', value: trim(answer.example, 1024) },
                //{ name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` }
            );
        
        message.channel.send(embed);
	}
}