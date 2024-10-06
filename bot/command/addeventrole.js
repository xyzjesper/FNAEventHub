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
    .setName("add-event")
    .setDescription("Add an event to the event list")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    const modal = new ModalBuilder();
    const eventname = new TextInputBuilder();
    const content = new TextInputBuilder();
    const date = new TextInputBuilder();
    const description = new TextInputBuilder();
    const eventID = new TextInputBuilder();

    modal.setTitle("Add Event").setCustomId("addevent-modal");

    eventname
      .setPlaceholder("Master Quiz, Game Night, ...")
      .setLabel("Event Name")
      .setRequired(true)
      .setCustomId("eventName")
      .setStyle(TextInputStyle.Short);

    eventID
      .setPlaceholder("1,2,3,4,5,6,7, ...")
      .setLabel("Event ID")
      .setRequired(true)
      .setStyle(TextInputStyle.Short)
      .setCustomId("eventID");

    description
      .setPlaceholder("Description")
      .setLabel("Description")
      .setRequired(true)
      .setCustomId("description")
      .setStyle(TextInputStyle.Short);

    date
      .setPlaceholder("https://deinimage.de/image.png")
      .setLabel("Image URl")
      .setRequired(true)
      .setCustomId("image")
      .setStyle(TextInputStyle.Short);

    content
      .setPlaceholder("Content")
      .setLabel("Content")
      .setRequired(true)
      .setCustomId("content")
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(
      new ActionRowBuilder().addComponents(eventID),
      new ActionRowBuilder().addComponents(eventname),
      new ActionRowBuilder().addComponents(description),
      new ActionRowBuilder().addComponents(date),
      new ActionRowBuilder().addComponents(content)
    );

    interaction.showModal(modal);
  },
};
