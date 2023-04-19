require("dotenv").config();
const { Client, Events, IntentsBitField, EmbedBuilder } = require("discord.js");
const Leaderboard = require("../models/leaderboard");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "addwins") {
    interaction.reply("thanks for that chief, let me do some math real quick");

    const georgeNewWin = interaction.options.get("george").value;
    const mattNewWin = interaction.options.get("matt").value;
    const lukeNewWin = interaction.options.get("luke").value;
    const joeNewWin = interaction.options.get("joe").value;
    const tyNewWin = interaction.options.get("ty").value;

    console.log(georgeNewWin);
    console.log(mattNewWin);
    console.log(lukeNewWin);
    console.log(joeNewWin);
    console.log(tyNewWin);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "fetch") {
    const george = await Leaderboard.findOne({ where: { name: "George" } });
    const luke = await Leaderboard.findOne({ where: { name: "Luke" } });
    const matt = await Leaderboard.findOne({ where: { name: "Matt" } });
    const joe = await Leaderboard.findOne({ where: { name: "Joe" } });
    const ty = await Leaderboard.findOne({ where: { name: "Ty" } });




    const embed = new EmbedBuilder()
      .setTitle("The Board")
      .setDescription("The official Bunnies' Golf It leaderboard")
	  .setColor(0xFFC0CB)
	  .addFields({
		name: 'FIRST',
		value: ' ',
		inline: true,
	  },
	  {
		name:  george.get('name'),
		value: george.get('wins').toString(),
		inline: true,
	  },
	  {
		name: ' ',
		value: ' ',
	  },
	  {
		name: 'SECOND',
		value: ' ',
		inline: true,
	  },
	  {
		name: matt.get('name'),
		value: matt.get('wins').toString(),
		inline: true,
	  },
	  {
		name: ' ',
		value: ' ',
	  },
	  {
		name: 'THIRD',
		value: ' ',
		inline: true,
	  },
	  {
		name: luke.get('name'),
		value: luke.get('wins').toString(),
		inline: true,
	  },
	  {
		name: ' ',
		value: ' ',
	  },
	  {
		name: 'FOURTH',
		value: ' ',
		inline: true,
	  },
	  {
		name: ty.get('name'),
		value: ty.get('wins').toString(),
		inline: true,
	  },
	  {
		name: ' ',
		value: ' ',
	  },
	  {
		name: 'FIFTH',
		value: ' ',
		inline: true,
	  },
	  {
		name: joe.get('name'),
		value: joe.get('wins').toString(),
		inline: true,
	  })

    interaction.reply({ embeds: [embed] });
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "addnames") {
    const name = interaction.options.getString("name");
    const nameWins = interaction.options.getString("wins");

    console.log(name);
    console.log(nameWins);

    try {
      const leaderboard = await Leaderboard.create({
        name: name,
        wins: nameWins,
      });

      return interaction.reply(`Name ${name.name} added.`);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return interaction.reply("That name already exists.");
      }

      return interaction.reply("Something went wrong with adding a name.");
    }
  }
});

client.login(process.env.TOKEN);
