const {
  ButtonInteraction,
  Client,
  EmbedBuilder,
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalSubmitInteraction,
  StringSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  id: "result-event-second-modal",

  /**
   *
   * @param {ModalSubmitInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const eventID = interaction.customId.split(":")[1];
    const eventDB = require("../schema/eventroles");
    const eventdata = await eventDB.findOne({ ID: eventID });
    const user = interaction.fields.getTextInputValue(
      "result-event-second-user"
    );
    const points = interaction.fields.getTextInputValue(
      "result-event-second-points"
    );
    const description = interaction.fields.getTextInputValue(
      "result-event-second-description"
    );
    const avatar = interaction.fields.getTextInputValue(
      "result-event-second-avatar"
    );
    const link = interaction.fields.getTextInputValue(
      "result-event-second-link"
    );

    await eventDB.findOneAndUpdate(
      { ID: eventID },
      {
        SecondPlace: {
          User: user,
          Points: points,
          Description: description,
          Avatar: avatar,
          Link: link,
        },
      }
    );

    interaction.reply({
      content: "Zweite Platz erfolgreich hinzugefügt!",
      ephemeral: true,
    });
  },
};
