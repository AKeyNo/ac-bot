const Discord = require('discord.js');

module.exports = {
    name: 'sail',
    description: 'Roll a villager.',
    args: false,
    guildOnly: true,

    execute(message, args) {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('VILLAGER')
            .setDescription('TYPE OF VILLAGER')
            .setThumbnail('https://dodoairlines.com/images/dodo-logo.png')
            .setImage('https://oyster.ignimgs.com/mediawiki/apis.ign.com/animal-crossing-new-horizons/7/75/Alfonso_NewLeaf.png?width=325')
            .setTimestamp()
            .setFooter('hmm', 'https://i.imgur.com/wSTFkRM.png');

        message.channel.send(exampleEmbed).then(sentEmbed => {
            sentEmbed.react('❤');
        })
    },
};