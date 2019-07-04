module.exports = {
	name: 'prune',
	description: 'Deletes as many messages as the user wants (from 1-99)',
	args: true,
	usage: '<amount>',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if(amount <= 1 || amount > 100)
			return message.reply('Number needs to be between 1 and 99.');

		message.channel.bulkDelete(amount, true).catch(err =>{
			console.log(err);
			message.reply('Some of these messages are too old for me to delete.');
		});
		message.channel.send('Messages deleted successfuly.');
	}
};
