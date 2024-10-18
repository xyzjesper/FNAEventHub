const { model, Schema } = require("mongoose");
const { String, Boolean } = require("../util/schemaArguments");

const eventuser = new Schema({
  Username: String,
  EventID: String,
  Infos: String,
  Boolean: Boolean,
  Avatar: String,
});

module.exports = model("eventuser", eventuser);
