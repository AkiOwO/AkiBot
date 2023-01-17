const { SlashCommandBuilder } = require('discord.js');

var test = 0;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		test++;
		await interaction.reply('Ponged! ' + test + ' times today.');
	},
};