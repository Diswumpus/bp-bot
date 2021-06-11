const Discord = require('discord.js');
const perms = require('../../models/perms');

module.exports = {
	name: 'remove',
	description: 'Remove a user to play music!',
	async execute(message, Member, args) {
        if (message.member.permissions.has('ADMINISTRATOR')) {
		let newuser = message.mentions.users.first() || args[0]
        if(!newuser || !args[0]) {
            return message.reply(
                new Discord.MessageEmbed()
                .setTitle(`Who do you want to let play music?`)
                .setColor('BLUE')
            )
        }
        if(!message.mentions.users.first()){
            newuser = await message.client.users.fetch(newuser)
        }
        let messageUser = await perms.findOne({
            user: newuser.id
        });
        if(!messageUser){
            return message.reply(
                new Discord.MessageEmbed()
                .setTitle(`Could not find that user!`)
            )
        }
        await perms.findOneAndRemove({
            user: newuser.id
        })

		return message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`Removed ${newuser} to \`play\`, \`queue\`, \`pause\` and \`change the volume\``)
            .setColor('BLUE')
        );
        }
	}
};