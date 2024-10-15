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
  id: "addevent-modal",

  /**
   *
   * @param {ModalSubmitInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const eventID = interaction.fields.getTextInputValue("eventID");
    const eventName = interaction.fields.getTextInputValue("eventName");
    const description = interaction.fields.getTextInputValue("description");
    const image = interaction.fields.getTextInputValue("image");
    const content = interaction.fields.getTextInputValue("content");
    const eventDB = require("../../event/schema/eventroles");

    const embed = new EmbedBuilder().setDescription(
      [
        `## Event Added`,
        ``,
        `**Event ID**: \`${eventID}\``,
        `**Event Name**: \`${eventName}\``,
        ``,
        `## Now Select a Role for this Event`,
      ].join("\n")
    );

    const row = new ActionRowBuilder().addComponents(
      new RoleSelectMenuBuilder()
        .setCustomId("eventRole:" + eventID)
        .setPlaceholder("Select a Role")
        .setMaxValues(1)
        .setMinValues(1)
    );

    const selection = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("event-add-select-type:" + eventID)
        .setPlaceholder("Select the type of event")
        .setMaxValues(1)
        .addOptions(
          {
            label: "Event",
            value: "event",
          },

          {
            label: "Turnier",
            value: "turnier",
          }
        )
        .setMinValues(1)
    );
    const data = await eventDB.findOne({ ID: eventID });

    if (data) {
      return interaction.reply({
        content: "## :x: Event ID already exists",
        ephemeral: true,
      });
    }

    await eventDB.create({
      ID: eventID,
      EventName: eventName,
      Content: content,
      Image: image,
      Description: description,
    });

    interaction.reply({ embeds: [embed], components: [row, selection], ephemeral: true });
  },
};
