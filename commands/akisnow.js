const { SlashCommandBuilder, PermissionFlagsBits, AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('akisnow')
		.setDescription('AkiSnow your friends.')
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('The user you want to AkiSnow.')
				.setRequired(true)),
    async execute(interaction) {


        var test = interaction.options.getUser('user');
        var interactionUser = interaction.user;

        const file = new AttachmentBuilder('./assets/akisnow.png');
        const exampleEmbed = new EmbedBuilder()
	        .setTitle('Get Akisnowed xd')
	        .setImage('attachment://akisnow.png');

        await interaction.reply({ content: `${test} has been Akisnowed by ${interactionUser}!`, embeds: [exampleEmbed], files: [file] });
    },
};