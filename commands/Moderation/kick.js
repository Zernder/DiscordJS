const { SlashCommandBuilder, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a member from the server')
		.addUserOption((option) =>
			option
				.setName('member')
				.setDescription('The member to kick')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('The reason for the kick'),
		),
	async execute(interaction) {
		const member = interaction.options.getMember('member');
		const reason =
      interaction.options.getString('reason') || 'No reason provided';

		if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
			return interaction.reply({
				content: 'You do not have permission to use this command.',
				ephemeral: true,
			});
		}

		if (!member.kickable) {
			return interaction.reply({
				content: 'The member cannot be kicked.',
				ephemeral: true,
			});
		}

		try {
			await member.kick(reason);
			interaction.reply({
				content: `Successfully kicked ${member.user.tag}`,
				ephemeral: true,
			});
		}
		catch (error) {
			console.error(error);
			interaction.reply({
				content: 'An error occurred while trying to kick the member.',
				ephemeral: true,
			});
		}
	},
};
