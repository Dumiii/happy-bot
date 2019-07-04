
const {prefix} = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Displays the list of all my commands, or information about a specific one',
	aliases: '[commands]',
	usage: '<command name>',
	execute(message, args) {
		const data = [];
		const {commands} = message.client;

		if (!args.length) {
			data.push(`Here's a list of all my commands:`)
			data.push(commands.map(command => command.name).join('  '));
			data.join('\n');
			data.push(`You can send \`${prefix}help <command name>\` to get info on a specific command.`);

			return message.author.send(data, {split: true})
			.then(() => {
				if (message.channel.type === 'dm') return;
				message.reply('I\'ve sent you a DM with all of my commands');
			})
			.catch(error => {
				console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
				message.reply('I can\'t DM you, do you have DMs disabled?');
			});
		}
		else
		{
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

			if (!command) return message.reply('I don\'t know that command.');

			data.push(`Name: ${command.name}`);

			if (command.aliases) data.push(`Aliases: ${command.aliases}`);

			data.push(`Description: ${command.description}`)
		
			if (command.usage) data.push(`Usage: ${prefix}${command.name} ${command.usage}`)

			message.channel.send(data, {split: true});
		}
	},
};