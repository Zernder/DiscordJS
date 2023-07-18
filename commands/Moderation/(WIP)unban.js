const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('unbans a member from the server')
		.addUserOption((option) =>
			option
				.setName('member')
				.setDescription('The member to unban')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('The reason for the unban'),
		),
	async execute(interaction) {
		const UserId = interaction.options.getString('userid');
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
				content: 'The member cannot be Unbanned.',
				ephemeral: true,
			});
		}

		try {
			await interaction.guild.members.unban(UserId);
			interaction.reply({
				content: `Successfully Unbanned ${member.user.tag}`,
				ephemeral: true,
			});
		}
		catch (error) {
			console.error(error);
			interaction.reply({
				content: 'An error occurred while trying to Unban the member.',
				ephemeral: true,
			});
		}
	},
};
