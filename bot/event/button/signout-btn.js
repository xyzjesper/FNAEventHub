const {
  ButtonInteraction,
  Client,
  EmbedBuilder,
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  id: "signout-btn",

  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const eventID = interaction.customId.split(":")[1];
    const eventDB = require("../../event/schema/eventroles");
    const userDB = require("../../event/schema/eventuser");
    const data = await eventDB.findOne({
      ID: eventID,
    });

    if (!data) {
      return interaction.reply({
        content: "## :x: Event ID not found",
        ephemeral: true,
      });
    }

    const role = interaction.guild.roles.cache.get(data.RoleID);

    if (!role) {
      return interaction.reply({
        content: "## :x: Role not found",
        ephemeral: true,
      });
    }

    await interaction.member.roles.remove(role);

    await userDB.deleteMany({
      Username: interaction.user.username,
    });

    await interaction.deferUpdate();
  },
};
