
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('aye!-help');
});

client.on('message', message => {

	const cringe = ['feromonas', 'fenonastico', 'vski', 'tiagovski', '#VSKI', '#vski'];

	for(var i = 0; i < cringe.length; i++)
	{
		if(message.content.includes(cringe[i])) message.delete();
	}
	
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	if(message.channel.id === '465317570698936331') return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return message.reply('I don\'t know that command.');

	if(command.guildOnly && message.channel.type !== 'text') return message.reply(`I can't execute that command inside DMs.`);

	if(command.args && !args.length) {
		let reply = message.channel.send(`You did not provide any arguments, ${message.author}.`);

		if (command.usage) {
			reply = `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// dynamically executes commands
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Error: command cannot be executed.');
	}
});

client.login(process.env.token);
