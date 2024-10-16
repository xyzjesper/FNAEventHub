const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const SUCCESS = process.env.SUCCESSURL;
const ERROR = process.env.ERRORURL;

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODBURL, {
    dbName: "events",
    keepAlive: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.get("/", (req, res) => {
  res.sendFile(`${process.cwd()}/backend/html/index.html`);
});

app.get("/event", async (req, res) => {
  const code = req.query.code;
  const { request } = require("undici");
  const tokenResponseData = await request(
    "https://discord.com/api/oauth2/token",
    {
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.APPLICATIONID,
        client_secret: process.env.CLIENTSECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.REDIRECTURL,
        scope: "identify",
      }).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const oauthData = await tokenResponseData.body.json();

  fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: `${oauthData.token_type} ${oauthData.access_token}`,
    },
  })
    .then((result) => result.json())
    .then(async (response) => {
      const userDB = require("./database/schemas/eventuser");

      const url = req.url;
      const data = await userDB.findOne({
        Username: response.username,
        EventID: url.split("&")[1].split("=")[1].split("-")[0],
      });
      if (data) {
        return res.redirect(ERROR);
      }

      await userDB.create({
        EventID: url.split("&")[1].split("=")[1].split("-")[0],
        Username: response.username,
        Infos: Buffer.from(
          url.split("&")[1].split("=")[1].split("-")[1],
          "base64"
        ).toString("utf-8"),
      });

      res.redirect(SUCCESS);
    })
    .catch((err) => {
      console.log(err);
      return res.redirect(ERROR);
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
