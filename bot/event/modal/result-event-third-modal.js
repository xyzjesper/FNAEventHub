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
  id: "result-event-third-modal",

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
      "result-event-third-user"
    );
    const points = interaction.fields.getTextInputValue(
      "result-event-third-points"
    );
    const description = interaction.fields.getTextInputValue(
      "result-event-third-description"
    );
    const avatar = interaction.fields.getTextInputValue(
      "result-event-third-avatar"
    );
    const link = interaction.fields.getTextInputValue(
      "result-event-third-link"
    );

    await eventDB.findOneAndUpdate(
      { ID: eventID },
      {
        ThirdPlace: {
          User: user,
          Points: points,
          Description: description,
          Avatar: avatar,
          Link: link,
        },
      }
    );

    interaction.reply({
      content: "Dritte Platz erfolgreich hinzugefügt!",
      ephemeral: true,
    });
  },
};
