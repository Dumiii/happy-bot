module.exports = {
	name: 'server',
	description: 'Provides useful information about the server.',
	guildOnly: true,
	execute(message, args) {
		if(message.guild.available) 
			return message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nCreated at: ${message.guild.createdAt}`);
	},
};