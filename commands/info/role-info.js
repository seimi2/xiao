const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { util } = require('discord.js-commando');

module.exports = class RoleInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'role-info',
			aliases: ['role'],
			group: 'info',
			memberName: 'role',
			description: 'Responds with detailed information on a role.',
			guildOnly: true,
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'role',
					prompt: 'Which role would you like to get information on?',
					type: 'role'
				}
			]
		});
	}

	run(msg, { role }) {
		const serialized = role.permissions.serialize();
		const perms = Object.keys(util.permissions).filter(perm => serialized[perm]);
		const embed = new MessageEmbed()
			.setColor(role.hexColor)
			.addField('❯ Name',
				role.name, true)
			.addField('❯ ID',
				role.id, true)
			.addField('❯ Color',
				role.hexColor.toUpperCase(), true)
			.addField('❯ Creation Date',
				role.createdAt.toDateString(), true)
			.addField('❯ Hoisted',
				role.hoist ? 'Yes' : 'No', true)
			.addField('❯ Mentionable',
				role.mentionable ? 'Yes' : 'No', true)
			.addField('❯ Permissions',
				perms.map(perm => util.permissions[perm]).join(', ') || 'None');
		return msg.embed(embed);
	}
};
