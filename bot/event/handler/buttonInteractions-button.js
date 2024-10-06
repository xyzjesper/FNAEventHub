const {
  ButtonInteraction,
  Client,
  EmbedBuilder,
  PermissionsBitField,
  Events,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  WebhookClient,
  codeBlock,
} = require("discord.js");
const fs = require("fs");
/**
 *
 * @param {Client} client
 * @param {fs} fs
 * @param {AsciiTable} ascii
 */
module.exports = async (client, fs, ascii) => {
  client.on(
    Events.InteractionCreate,

    /**
     *
     * @param {ButtonInteraction} interaction
     */
    async (interaction) => {
      try {
        if (!interaction.isButton()) return;

        const { customId } = interaction;

        const button = client.buttons.get(customId.split(":")[0]);

        try {
          return await button.execute(interaction, client);
        } catch (error) {
          console.log(` FAILED to execute the Buttons\n${error}`);
        }
      } catch (error) {
        console.log(`❌ FAILED to execute the Buttons\n${error}`);
      }
    }
  );
};
