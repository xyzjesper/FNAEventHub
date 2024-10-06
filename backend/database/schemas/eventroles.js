const { model, Schema, models } = require("mongoose");
const { String } = require("../schemaArguments");

const eventroleSchema = new Schema({
  ID: String,
  RoleID: String,
  EventName: String,
  Content: String,
  Image: String,
  Description: String,
  Ended: { type: Boolean, default: false },
});

const eventrole = models.eventrole || model("eventrole", eventroleSchema);

module.exports = eventrole;
