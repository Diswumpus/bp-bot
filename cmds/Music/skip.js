const perms = require('../../models/perms');

module.exports = {
	name: 'skip',
	description: 'Skip command.',
	cooldown: 5,
	async execute(message, Member, args) {
		let messageUser = await perms.findOne({
            user: message.author.id
        });
		if (message.member.permissions.has('ADMINISTRATOR') || messageUser.perm === true) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		}
	}
};