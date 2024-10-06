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
    .setName("info")
    .setDescription("View the bot's information")
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
    const embed = new EmbedBuilder()
      .setTitle("Information")
      .setDescription(
        [
          `## <:fna:1292515870085484697> FNA Events`,
          ``,
          `Willkommen zu FNA Events deine events von Pexy!`,
          `Das ist unser Discord Bot für Events!`,
          ``,
          `Melde dich auf **[<:fna:1292515870085484697> FNA-Events.de](https://fna-events.de)** an und verpasse keine Events mehr!`,
        ].join("\n")
      )
      .setAuthor({
        name: interaction.guild.name,
        iconURL: interaction.guild.iconURL(),
      });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Anmelden")
        .setEmoji("📅")
        .setURL("https://fna-events.de")
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setLabel("FNA Twitch")
        .setEmoji("📺")
        .setURL("https://twitch.tv/pexyfna")
        .setStyle(ButtonStyle.Link)
    );

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
      components: [row],
    });
  },
};
