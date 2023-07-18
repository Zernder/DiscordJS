const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('bans a member from the server')
		.addUserOption((option) =>
			option
				.setName('member')
				.setDescription('The member to ban')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('The reason for the ban'),
		),
	async execute(interaction) {
		const member = interaction.options.getMember('member');
		// const reason = interaction.options.getString('reason') || 'No reason provided';

		if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
			return interaction.reply({
				content: 'You do not have permission to use this command.',
				ephemeral: true,
			});
		}

		if (!member.bannable) {
			return interaction.reply({
				content: 'The member cannot be banned.',
				ephemeral: true,
			});
		}

		try {
			await member.ban(member);
			interaction.reply({
				content: `Successfully banned ${member.user.tag}`,
				ephemeral: true,
			});
		}
		catch (error) {
			console.error(error);
			interaction.reply({
				content: 'An error occurred while trying to ban the member.',
				ephemeral: true,
			});
		}
	},
};
