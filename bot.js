
const fs = require('fs');
const Discord = require('discord.js');

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('aye!-help');
});

client.on('message', message => {

	
});

client.login(process.env.token);
