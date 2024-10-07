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
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("look-event")
    .setDescription("Remove an event from the event list")
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
    const id = interaction.options.getString("eventid");

    const eventDB = require("../event/schema/eventroles");
    const userDB = require("../event/schema/eventuser");

    const data = await eventDB.findOne({ ID: id });

    if (!data) {
      return interaction.reply({
        content: "## :x: Event ID not found",
        ephemeral: true,
      });
    }

    await eventDB.findOneAndUpdate({ ID: id }, { Looked: true });

    interaction.reply({
      content: "## :white_check_mark: Event looked",
      ephemeral: true,
    });
  },
};
