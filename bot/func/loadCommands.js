require("dotenv").config();

const { Client } = require("discord.js");
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const cmdlist = [];

/**
 *
 * @param {Client} client
 */
async function loadCommands(client) {
  const commandFiles = fs
    .readdirSync(`${process.cwd()}/bot/command`)
    .filter((file) => file.endsWith(".js"));

  // const subCommandFiles = fs
  //   .readdirSync(`${process.cwd()}/bot/command/subCommand`)
  //   .filter((file) => file.endsWith(".js"));

  commandFiles.forEach((file) => {
    const command = require(`${process.cwd()}/bot/command/${file}`);
    client.commands.set(command.data.name, command);
    return cmdlist.push(command.data.toJSON());
  });

  // subCommandFiles.forEach((file) => {
  //   const command = require(`${process.cwd()}/bot/command/subCommand/${file}`);
  //   return client.subCommands.set(command.subCommand, command);
  // });

  const restClient = new REST({ version: `10` }).setToken(process.env.TOKEN);

  restClient
    .put(
      Routes.applicationCommands(
        process.env.APPLICATIONID,
        process.env.ADMINGUILDID
      ),
      {
        body: cmdlist,
      }
    )
    .then(() =>
      console.log(
        ` SUCCESSFULL (re)-loaded:\n\nCommands: ${
          commandFiles.length >= 1 ? "(" + commandFiles.length + ")" : "None"
        }\n`
      )
    )
    .catch(console.error());
}

module.exports = { loadCommands };
