const { model, Schema, models } = require("mongoose");
const { String } = require("../schemaArguments");

const eventuserSchema = new Schema({
  Username: String,
  EventID: String,
  Infos: String,
  Avatar: String,
  Boolean: Boolean,
});

const eventuser = models?.eventuser || model("eventuser", eventuserSchema);

module.exports = eventuser;
