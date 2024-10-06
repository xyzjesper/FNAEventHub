require("dotenv").config();
const { Client, ActivityType, PresenceUpdateStatus } = require("discord.js");
const { loadCommands } = require("../../func/loadCommands");
const { eventroleCkecker } = require("../../schedules/rolechecker");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  async execute(client) {
    loadCommands(client);

    setInterval(() => {
      eventroleCkecker(client);
    }, 5000);

    client.user.presence.set({
      status: PresenceUpdateStatus.Online,
      activities: [
        {
          type: ActivityType.Custom,
          name: `🎫 Anmelden auf FNAEvents.de`,
        },
      ],
    });
  },
};
