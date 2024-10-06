const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

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

app.post("/event", async (req, res) => {
  const userDB = require("./database/schemas/eventuser");
  const data = await userDB.findOne({
    Username: req.body.headers.Name,
  });

  if (data) {
    return res.status(201).json({ error: "User already exists" });
  }

  await userDB.create({
    EventID: req.body.headers.ID,
    Username: req.body.headers.Name,
    Infos: req.body.headers.Info || "No Info",
  });
  return res.status(200).json({ message: "User created" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
