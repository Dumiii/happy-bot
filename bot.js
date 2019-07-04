
const Discord = require('discord.js');

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('aye!-help');
});

client.on('message', message => {
	if (message.content === 'ping')
		return message.channel.send('pong');
});

client.login(process.env.token);
