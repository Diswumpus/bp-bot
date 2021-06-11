const perms = require('../../models/perms');

module.exports = {
	name: 'queue',
	description: 'Queue command.',
	async execute(message, Member, args) {
		let messageUser = await perms.findOne({
            user: message.author.id
        });
		if (message.member.permissions.has('ADMINISTRATOR') || messageUser.perm === true) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
		}
	}
};