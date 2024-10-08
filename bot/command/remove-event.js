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
    .setName("remove-event")
    .setDescription("Remove an event from the event list")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addStringOption((option) =>
      option.setName("eventid").setDescription("The event id").setRequired(true)
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  async execute(interaction, client) {
    const id = interaction.options.getString("eventid");

    const eventDB = require("../event/schema/eventroles");
    const userDB = require("../event/schema/eventuser");

    const data = await eventDB.findOne({ ID: id });

    if (!data) {
      return interaction.reply({
        content: "## :x: Event ID not found",
        ephemeral: true,
      });
    }

    const users = await userDB.find({ EventID: id }).sort();

    users.forEach(async (user) => {
      const guild = client.guilds.cache.get(process.env.ADMINGUILDID);
      const member = guild.members.cache.find(
        (x) => x.user.username === user.Username
      );

      if (member) {
        await member.roles.remove(data.RoleID);
      }
    });

    await eventDB.findOneAndUpdate({ ID: id }, { Ended: true });
    await userDB.deleteMany({ EventID: id });

    interaction.reply({
      content: "## :white_check_mark: Event removed",
      ephemeral: true,
    });
  },
};
