require("dotenv").config();
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  PermissionsBitField,
  Client,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("View your profile")
    .setDMPermission(false)
    .setDefaultMemberPermissions(
      PermissionsBitField.Flags.UseApplicationCommands
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });
    const userDB = require("../event/schema/eventuser");
    const data = await userDB.findOne({ Username: interaction.user.username });
    const eventDB = require("../event/schema/eventroles");

    if (!data) {
      return interaction.reply({
        content: "## :x: This user is not registered in any event",
        ephemeral: true,
      });
    }
    const row = new ActionRowBuilder();
    const embed = new EmbedBuilder()
      .setTitle("Manage your profile")
      .setDescription(
        [
          `> **User**: \`${interaction.user.username}\``,
          `> **ID**: \`${interaction.user.id}\``,
        ].join("\n")
      )
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      });

    const userevents = await userDB
      .find({ Username: interaction.user.username })
      .sort();

    userevents.forEach(async (uevents) => {
      const events = await eventDB
        .find({
          ID: uevents.EventID,
        })
        .sort();

      events.forEach(async (bevent) => {
        let button = new ButtonBuilder()
          .setLabel("Abmelden vom " + bevent.EventName)
          .setEmoji("❌")
          .setCustomId(`signout-btn:${bevent.ID}`)
          .setStyle(ButtonStyle.Primary);
        row.addComponents(button);
      });

      await interaction.editReply({
        embeds: [embed],
        ephemeral: true,
        components: [row],
      });
    });
  },
};
