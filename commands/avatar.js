module.exports = {
	name: 'avatar',
	description: 'Replies with the user\'s avatar, or a list of all the avatars of the mentioned users',
	aliases: '[icon, pfp]',
	execute(message, args) {
		if(!message.mentions.users.size) {
			return message.reply(`this is your avatar: ${message.author.displayAvatarURL}`);
		}
	
		const avatarList = message.mentions.users.map(user =>{
			return `${user.username}'s avatar: ${user.displayAvatarURL}`;
		});

		message.channel.send(avatarList);
	}
};