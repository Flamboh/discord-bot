const { token, guildId, clientId } = require('./config.json');
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'embed',
        description: 'sends an embed',
    },
    {
        name: 'hey',
        description: 'replies with haiiiiiii!',
    },
    {
        name: 'artist',
        description: 'displays an artist',
        options: [
            {
                name: 'artist',
                description: 'an artist',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ]
    },
    {
        name: 'gun',
        description: 'replies with gun emoji!',
    },
    {
        name: 'add',
        description: 'adds two numbers',
        options: [
            {
                name: 'num1',
                description: 'first number',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'one',
                        value: 1,
                    },
                    {
                        name: 'two',
                        value: 2,
                    },
                    {
                        name: 'three',
                        value: 3,
                    },
                ],
                required: true,
            },
            {
                name: 'num2',
                description: 'second number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },

        ]
    },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                clientId,
                guildId
            ),
            { body: commands }
        );

        console.log('Slash commands were registered successfully!');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();
