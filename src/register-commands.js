require("dotenv").config();

const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
    {
        name: 'addwins',
        description: 'who the hell won',
        options: [
            {
                name: 'george',
                description: "George's big ol' wins",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'matt',
                description: "Matty's cheating again",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'luke',
                description: "Luke's supreme golf exhibitions",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'joe',
                description: "Joe's wins????????",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'ty',
                description: "Ty shows his stuff ;)",
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
    {
      name: 'addname',
      description: 'this thing just adds people when I need it to',
      options: [
        {
          name: 'name',
          description: 'who am I adding here',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: 'wins',
          description: 'how many wins do they have',
          type: ApplicationCommandOptionType.Number,
          required: true,
        }
      ]
    },
    {
      name: 'fetch',
      description: 'this retrieves info from the database'
    }
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("slash commands were registered successfully!");
  } catch (error) {
    console.log(`this is your problem: ${error}`);
  }
})();
