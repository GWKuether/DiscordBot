require("dotenv").config();
const { Client, Events, IntentsBitField, EmbedBuilder } = require("discord.js");
const Leaderboard = require("../models/leaderboard");
const { where } = require("sequelize");

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

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "getleaderboard") {
    const george = await Leaderboard.findOne({ where: { name: "George" } });
    const luke = await Leaderboard.findOne({ where: { name: "Luke" } });
    const matt = await Leaderboard.findOne({ where: { name: "Matt" } });
    const joe = await Leaderboard.findOne({ where: { name: "Joe" } });
    const ty = await Leaderboard.findOne({ where: { name: "Ty" } });

	const embed = new EmbedBuilder()
      .setTitle("GOLF WINS")
      .setDescription("The Official Bunnies' Golf It Leaderboard")
	  .setColor(0xFFC0CB)
	  .addFields({
		name:  george.get('name'),
		value: george.get('wins').toString(),
		inline: true,
	  },
	  {
		name: matt.get('name'),
		value: matt.get('wins').toString(),
		inline: true,
	  },
	  {
		name: luke.get('name'),
		value: luke.get('wins').toString(),
		inline: true,
	  },
	  {
		name: ty.get('name'),
		value: ty.get('wins').toString(),
		inline: true,
	  },
	  {
		name: joe.get('name'),
		value: joe.get('wins').toString(),
		inline: true,
	  })

    interaction.reply({ embeds: [embed] });
  }

  else if (interaction.commandName === "addwins"){

	const george = await Leaderboard.findOne({ where: { name: "George" } });
    const luke = await Leaderboard.findOne({ where: { name: "Luke" } });
    const matt = await Leaderboard.findOne({ where: { name: "Matt" } });
    const joe = await Leaderboard.findOne({ where: { name: "Joe" } });
    const ty = await Leaderboard.findOne({ where: { name: "Ty" } });

	const georgeNewWins = interaction.options.get("george").value
    const mattNewWins = interaction.options.get("matt").value
    const lukeNewWins = interaction.options.get("luke").value
    const joeNewWins = interaction.options.get("joe").value
    const tyNewWins = interaction.options.get("ty").value

	interaction.reply("thanks for that chief, I added all of those wins to the leaderboard");

	const updateGeorge = george.get('wins') + georgeNewWins
	const updateMatt = matt.get('wins') + mattNewWins
	const updateLuke = luke.get('wins') + lukeNewWins
	const updateTy = ty.get('wins') + tyNewWins
	const updateJoe = joe.get('wins') + joeNewWins


	const newGeorge = await Leaderboard.update({ wins: updateGeorge}, { where: { name: "George"}})
	const newMatt = await Leaderboard.update({ wins: updateMatt}, { where: { name: "Matt"}})
	const newLuke = await Leaderboard.update({ wins: updateLuke}, { where: { name: "Luke"}})
	const newTy = await Leaderboard.update({ wins: updateTy}, { where: { name: "Ty"}})
	const newJoe = await Leaderboard.update({ wins: updateJoe}, { where: { name: "Joe"}})
  }
});

// client.on(Events.InteractionCreate, async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "addnames") {
//     const name = interaction.options.getString("name");
//     const nameWins = interaction.options.getString("wins");

//     console.log(name);
//     console.log(nameWins);

//     try {
//       const leaderboard = await Leaderboard.create({
//         name: name,
//         wins: nameWins,
//       });

//       return interaction.reply(`Name ${name.name} added.`);
//     } catch (error) {
//       if (error.name === "SequelizeUniqueConstraintError") {
//         return interaction.reply("That name already exists.");
//       }

//       return interaction.reply("Something went wrong with adding a name.");
//     }
//   }
// });

client.login(process.env.TOKEN);
