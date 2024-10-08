const {
  ButtonInteraction,
  Client,
  EmbedBuilder,
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
} = require("discord.js");
require("dotenv").config();

module.exports = {
  id: "event-add-select-type",

  /**
   *
   * @param {import("discord.js").AnySelectMenuInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const eventDB = require("../../event/schema/eventroles");

    const eventID = interaction.customId.split(":")[1];

    interaction.values.forEach(async (type) => {
      const data = await eventDB.findOne({ ID: eventID });

      if (!data) {
        return interaction.reply({
          content: "## :x: Event ID not found",
          ephemeral: true,
        });
      }

      switch (type) {
        case "event":
          {
            await eventDB.findOneAndUpdate(
              { ID: eventID },
              {
                Turnier: false,
              }
            );

            interaction.reply({
              content: "## :white_check_mark: Event erfolgreich hinzugefügt!",
              ephemeral: true,
            });
          }
          break;

        case "turnier":
          {
            await eventDB.findOneAndUpdate(
              { ID: eventID },
              {
                Turnier: true,
              }
            );

            interaction.reply({
              content: "## :white_check_mark: Turnier erfolgreich hinzugefügt!",
              ephemeral: true,
            });
          }
          break;
      }
    });
  },
};
