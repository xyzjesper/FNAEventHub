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
  id: "eventRole",

  /**
   *
   * @param {import("discord.js").AnySelectMenuInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const eventDB = require("../../event/schema/eventroles");

    const eventID = interaction.customId.split(":")[1];

    interaction.values.forEach(async (roleID) => {
      const data = await eventDB.findOne({ ID: eventID });

      if (!data) {
        return interaction.reply({
          content: "## :x: Event ID not found",
          ephemeral: true,
        });
      }

      const role = interaction.guild.roles.cache.get(roleID);

      if (!role) {
        return interaction.reply({
          content: "## :x: Role not found",
          ephemeral: true,
        });
      }

      const eventinfochannel = interaction.guild.channels.cache.get(
        process.env.EVENTINFOCHANNEl
      );

      eventinfochannel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle(data.EventName)
            .setDescription(data.Content)
            .setTimestamp()
            .setAuthor({
              name: interaction.guild.name,
              iconURL: interaction.guild.iconURL(),
              url: `https://fna-events.de/posts/${data.ID}#signup`,
            }),
        ],
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setURL(`https://fna-events.de/posts/${data.ID}`)
              .setStyle(ButtonStyle.Link)
              .setLabel("Sign up for this Event")
              .setEmoji("<:fna:1290705466099368007>")
          ),
        ],
      });

      await eventDB.findOneAndUpdate({ ID: eventID }, { RoleID: roleID });

      const embed = new EmbedBuilder().setDescription(
        [
          `## Event Role Added`,
          ``,
          `**Event ID**: \`${eventID}\``,
          `**Event Name**: \`${data.EventName}\``,
          `**Role**: ${role}`,
        ].join("\n")
      );

      interaction.reply({ embeds: [embed], ephemeral: true });
    });
  },
};
