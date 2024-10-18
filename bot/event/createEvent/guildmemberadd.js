const {
  Client,
  EmbedBuilder,
  PermissionsBitField,
  Events,
  GuildMember,
  GuildMemberRoleManager,
} = require("discord.js");

module.exports = {
  name: Events.GuildMemberAdd,

  /**
   *
   * @param {GuildMember} member
   * @param {Client} client
   */
  async execute(member, client) {
    const userDB = require("../../event/schema/eventuser");
    const eventDB = require("../../event/schema/eventroles");
    const data = await userDB.findOne({ Username: member.user.username });

    if (!data) {
      return;
    }

    if (data.Boolean == true) {
      return;
    }

    const event = await eventDB.findOne({ ID: data.EventID });

    if (!event) {
      return;
    }

    const role = member.guild.roles.cache.get(event.RoleID);

    if (!role) {
      return;
    }

    const guild = member.guild;

    const user = guild.members.cache.get(member.user.id);

    if (!user) {
      return;
    }

    await user.roles.add(role);

    await userDB.findOneAndUpdate(
      { Username: member.user.username },
      { Boolean: true, Avatar: member.user.displayAvatarURL({ dynamic: true }) }
    );

    const channel = guild.channels.cache.get(event.EventChannel);
    channel.send({
      content: `## :tada: Welcome ${member.user} to the event!`,
    });
  },
};
