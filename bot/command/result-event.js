require("dotenv").config();
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  PermissionsBitField,
  Client,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  UserSelectMenuBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("result-event")
    .setDescription("Set the result of an event")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)

    .addStringOption((option) =>
      option.setName("eventid").setDescription("The event id").setRequired(true)
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    const eventID = interaction.options.getString("eventid");

    const first = new ActionRowBuilder().addComponents(
      new UserSelectMenuBuilder()
        .setCustomId("result-event-first:" + eventID)
        .setPlaceholder("Select the first place")
        .setMinValues(1)
        .setMaxValues(1)
    );

    const second = new ActionRowBuilder().addComponents(
      new UserSelectMenuBuilder()
        .setCustomId("result-event-second:" + eventID)
        .setPlaceholder("Select the second place")
        .setMinValues(1)
        .setMaxValues(1)
    );

    const third = new ActionRowBuilder().addComponents(
      new UserSelectMenuBuilder()
        .setCustomId("result-event-third:" + eventID)
        .setPlaceholder("Select the third place")
        .setMinValues(1)
        .setMaxValues(1)
    );

    interaction.reply({
      content: "Bitte wähle die ersten drei Plätze aus",
      components: [first, second, third],
      ephemeral: true,
    });
  },
};
