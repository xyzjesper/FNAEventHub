const { model, Schema } = require("mongoose");
const { String } = require("../util/schemaArguments");

const eventrole = new Schema({
  ID: String,
  RoleID: String,
  EventName: String,
  Content: String,
  Image: String,
  Description: String,
  Ended: Boolean,
});

module.exports = model("eventrole", eventrole);
