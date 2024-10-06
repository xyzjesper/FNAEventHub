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
    const userDB = require("../event/schema/eventuser");
    const data = await userDB.findOne({ Username: interaction.user.username });
    const eventDB = require("../event/schema/eventroles");

    if (!data) {
      return interaction.reply({
        content: "## :x: This user is not registered in any event",
        ephemeral: true,
      });
    }

    const event = await eventDB.findOne({ ID: data?.EventID });

    if (!event) {
      return interaction.reply({
        content: "## :x: This user is not registered in any event",
        ephemeral: true,
      });
    }

    const role = interaction.guild.roles.cache.get(event.RoleID);
    const guild = interaction.guild;
    const user = guild.members.cache.get(interaction.user.id);
    const embed = new EmbedBuilder()
      .setTitle("Profile")
      .setDescription(
        `> **Username**: ${interaction.user.username}\n> **Event**: ${event.EventName}\n> **Role**: <@&${role.id}>`
      )
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Sign out")
        .setEmoji("❌")
        .setCustomId(`signout-btn:${event.ID}`)
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
      components: [row],
    });
  },
};
