const { model, Schema } = require("mongoose");
const { String, Boolean } = require("../util/schemaArguments");

const eventuser = new Schema({
  Username: String,
  EventID: String,
  Infos: String,
  Boolean: Boolean,
});

module.exports = model("eventuser", eventuser);
