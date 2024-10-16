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
  Looked: Boolean,
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

module.exports = model("eventrole", eventrole);
