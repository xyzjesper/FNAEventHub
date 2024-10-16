const { model, Schema, models } = require("mongoose");
const { String } = require("../schemaArguments");
const { default: Link } = require("next/link");

const eventroleSchema = new Schema({
  ID: String,
  RoleID: String,
  EventName: String,
  Content: String,
  Image: String,
  Description: String,
  Ended: { type: Boolean, default: false },
  Looked: { type: Boolean, default: false },
  Turnier: Boolean,
  Kooperation: Boolean,
  FirstPlace: {
    User: String,
    Points: Number,
    Description: String,
    Avatar: String,
    Link: String,
  },
  SecondPlace: {
    User: String,
    Points: Number,
    Description: String,
    Avatar: String,
    Link: String,
  },
  ThirdPlace: {
    User: String,
    Points: Number,
    Description: String,
    Avatar: String,
    Link: String,
  },
});

const eventrole = models?.eventrole || model("eventrole", eventroleSchema);

module.exports = eventrole;
