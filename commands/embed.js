
const Discord = require('discord.js');

module.exports = {
	name: 'servercard',
	description: 'Sends the user\'s server card to the current channel by default or the server card of the first mention of the message.',
	aliases: ['card'],
	usage: '<user>',
	execute(message, args) {
		const embed = new Discord.RichEmbed();

		if (args.length)
		{
			const argsChecker = args[0];
		
			if(argsChecker[0] !== ('<') && argsChecker[1] !== ('@') && argsChecker[argsChecker.length - 1] !== ('>'))
			{
				return message.reply('Incorrect usage, either mention someone or don\'t give any arguments.');
			}aye!
		}

		if (message.mentions.users.size > 1) return message.reply('I can only display one server card at a time.');

		if (!message.mentions.users.size) {
			
			embed.setColor('#0099ff')
			embed.setThumbnail(`${message.author.displayAvatarURL}`)
			embed.addField('Username: ', `${message.author.username}`)
			embed.addField('Joined at: ', `${message.guild.joinedAt}`)
			embed.addField('Roles: ', message.member.roles.map(roles => `${roles}`).join(', '))
			embed.addBlankField()
			embed.setTimestamp()
		}
		else
		{
			const targetUser = message.mentions.users.first();

			embed.setColor('#0099ff')
			embed.setThumbnail(`${targetUser.displayAvatarURL}`)
			embed.addField('Username: ', `${targetUser.username}`)
			embed.addField('Joined at: ', `${message.guild.member(targetUser).joinedAt}`)
			embed.addField('Roles: ', message.guild.member(targetUser).roles.map(roles => `${roles}`).join(', '))
			embed.addBlankField()
			embed.setTimestamp()
		}

		message.channel.send(embed);
	},
};