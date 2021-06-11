const perms = require('../../models/perms');

module.exports = {
	name: 'pause',
	description: 'Pause command.',
	async execute(message, Member, args) {
		let messageUser = await perms.findOne({
            user: message.author.id
        });
		if (message.member.permissions.has('ADMINISTRATOR') || messageUser.perm === true) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send('⏸ Paused the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	}
	}
};