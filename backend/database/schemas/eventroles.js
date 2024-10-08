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
  Looked: { type: Boolean, default: false },
  Turnier: Boolean,
  FirstPlace: {
    User: String,
    Points: Number,
    Description: String,
    Avatar: String
  },
  SecondPlace: {
    User: String,
    Points: Number,
    Description: String,
    Avatar: String
  },
  ThirdPlace: {
    User: String,
    Points: Number,
    Description: String,
    Avatar: String,
  },
});

const eventrole = models.eventrole || model("eventrole", eventroleSchema);

module.exports = eventrole;
