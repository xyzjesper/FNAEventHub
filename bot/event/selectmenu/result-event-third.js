const {
  ButtonInteraction,
  Client,
  EmbedBuilder,
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
require("dotenv").config();

module.exports = {
  id: "result-event-third",

  /**
   *
   * @param {import("discord.js").AnySelectMenuInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    interaction.values.forEach(async (value) => {
      const modal = new ModalBuilder();
      const User = new TextInputBuilder();
      const Points = new TextInputBuilder();
      const Description = new TextInputBuilder();
      const Avatar = new TextInputBuilder();
      const Link = new TextInputBuilder();

      const member = interaction.guild.members.cache.get(value);

      modal
        .setTitle("Erster Platz")
        .setCustomId(
          "result-event-third-modal:" + interaction.customId.split(":")[1]
        );

      User.setPlaceholder("User")
        .setLabel("User")
        .setCustomId("result-event-third-user")
        .setStyle(TextInputStyle.Short)
        .setValue(member.user.username)
        .setRequired(true);

      Points.setPlaceholder("Punkte")
        .setLabel("Punkte")
        .setCustomId("result-event-third-points")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      Description.setPlaceholder("Beschreibung")
        .setLabel("Beschreibung")
        .setCustomId("result-event-third-description")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      Avatar.setPlaceholder("Avatar")
        .setLabel("Avatar")
        .setCustomId("result-event-third-avatar")
        .setStyle(TextInputStyle.Short)
        .setValue(member.user.displayAvatarURL())
        .setRequired(true);

      Link.setPlaceholder("Link")
        .setLabel("Link")
        .setCustomId("result-event-third-link")
        .setStyle(TextInputStyle.Short)
        .setValue("https://discord.com/users/" + member.user.id)
        .setRequired(true);

      modal.addComponents(
        new ActionRowBuilder().addComponents(User),
        new ActionRowBuilder().addComponents(Points),
        new ActionRowBuilder().addComponents(Description),
        new ActionRowBuilder().addComponents(Avatar),
        new ActionRowBuilder().addComponents(Link)
      );

      interaction.showModal(modal);
    });
  },
};
