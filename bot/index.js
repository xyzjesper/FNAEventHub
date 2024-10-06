require("dotenv").config();

const { MONGODBURL } = process.env;
const {
  Client,
  Partials,
  Collection,
  GatewayIntentBits,
  WebhookClient,
  EmbedBuilder,
} = require("discord.js");
const { connect, default: mongoose } = require("mongoose");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

const fs = require("fs");
const collection = new Collection();
client.commands = collection;

client.subCommands = collection;
client.buttons = collection;
client.selectmenus = collection;
client.modals = collection;

client.voiceGenerator = collection;

[
  "commands",
  "events",
  "buttons",
  "selectmenus",
  "modals",
  "database",
  "commandInteractions",
  "clientEvents",
  "buttonInteractions-button",
  "selectmenuInteractions",
  "modalInteractions",
].forEach((handler) =>
  require(`${process.cwd()}/bot/event/handler/${handler}`)(client, fs)
);

process.on("unhandledRejection", (reason, promise) => {
  console.log(`${reason}`);
});
process.on("uncaughtException", (err) => {
  console.log(`${err}`);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(`${err}`);
});

mongoose.set("strictQuery", true);
connect(process.env.MONGODBURL, {
  keepAlive: true,
  dbName: process.env.DBNAME,
})
  .then(console.log("The bot is Connected to the Database"))

  .catch((error) => {
    console.log(error);
  });

client
  .login(process.env.TOKEN)
  .then(() => {
    console.log(`The bot ${client.user.tag} is on:
        ${client.guilds.cache.size} guild(s)`);
  })
  .catch((error) => {
    console.log(error);
  });
