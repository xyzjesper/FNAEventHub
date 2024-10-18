const { Client } = require("discord.js");
require("dotenv").config();
/**
 * @param {Client} client
 */

async function getavatar(client) {
  const userDB = require("../event/schema/eventuser");

  const users = await userDB.find().sort("-id Username Boolean EventID");

  users.forEach(async (data) => {
    if (!data.Avatar) {
      return;
    }

    const user = await client.users.fetch(data.Avatar.split("/")[4]);
    if (user.avatar !== data.Avatar.split("/")[4]) {
      await userDB.findOneAndUpdate(
        { Username: data.Username },
        {
          Avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
        }
      );
    }
  });
}

module.exports = { getavatar };
