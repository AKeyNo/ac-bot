const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'urban', memberName: 'urban',
            aliases: ['urb'],
			group: 'general',
            guildOnly: true,
			description: 'Grabs definitions from urban dictionary.',
			throttling: {
				usages: 1,
				duration: 10,
            },
            args: [
                {
                    key: 'word',
                    prompt: 'What word would you like to define?',
                    type: 'string',
                    // default: '',
                }
            ]
		});
	}

	async run(message, { word }) {
        const query = querystring.stringify({ term: word });
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

        if (!list.length) {
            return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }

        const [answer] = list;

		const embed = new MessageEmbed()
            .setColor('#EFFF00')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
                { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` }
            );
        
        message.channel.send(embed);
	}
}