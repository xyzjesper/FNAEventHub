const { Client } = require("discord.js");
require("dotenv").config();
/**
 * @param {Client} client
 */

async function eventroleCkecker(client) {
  const userDB = require("../event/schema/eventuser");
  const eventDB = require("../event/schema/eventroles");
  const users = await userDB.find().sort("-id Username Boolean EventID");

  users.forEach(async (data) => {
    if (!data) {
      return;
    }

    const guild = client.guilds.cache.get(process.env.ADMINGUILDID);

    if (!guild) {
      return;
    }

    const user = guild.members.cache.find(
      (x) => x.user.username === data.Username
    );

    if (!user) {
      return;
    }

    if (data.Boolean == true) {
      return;
    }

    const userdata = await userDB.findOne({
      Username: data.Username,
    });

    const event = await eventDB.findOne({ ID: data.EventID });

    if (!event) {
      return;
    }

    const role = guild.roles.cache.get(event.RoleID);

    if (!role) {
      return;
    }

    user.roles.add(role);

    await userDB.findOneAndUpdate(
      { Username: data.Username },
      { Boolean: true, Avatar: member.user.displayAvatarURL({ dynamic: true }) }
    );

    const channel = guild.channels.cache.get(event.EventChannel);

    if (!channel) {
      return;
    }

    console.log(`✅ Welcome ${user.user.tag} to the event!`);
  });
}

module.exports = { eventroleCkecker };
