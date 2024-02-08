// Require the necessary discord.js classes
require('dotenv').config();
const { Client, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token, lastfmApiKey } = require('./config.json');
const fetch = require('node-fetch');

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', (message) => {
	if (message.author.bot) {
		return;
	}
	
	if (message.content === 'hello') {
		message.reply('Haiiiiiiiii :stuck_out_tongue_winking_eye: 😊');
	}

});

client.on('interactionCreate', (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	
	console.log(interaction.commandName);

	if (interaction.commandName === 'hey') {
		interaction.reply('Haiiiiiiiii');
	}

	if (interaction.commandName === 'artist') {
		const artist = interaction.options.get('artist').value;
		const response = fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${process.env.LASTFM_API_KEY}&format=json`)
			.then(response => response.json())
			.then(data => {
				const artistName = data.artist.name;
				console.log(data);
				interaction.reply(`Artist name: ${artistName}`);
			})
			.catch(error => console.error('Error:', error));
	}

	if (interaction.commandName === 'gun') {
		interaction.reply(':gun::explosion:');
	}

	if (interaction.commandName === 'add') {
		const num1 = interaction.options.get('num1').value;
		const num2 = interaction.options.get('num2').value;

		interaction.reply('The sum is ${num1 + num2}');
	}

	if (interaction.commandName === 'embed') {
		const embed = new EmbedBuilder()
			.setTitle("Embed title")
			.setDescription("Embed description")

		interaction.reply({ embeds: [embed] });
	}

});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);