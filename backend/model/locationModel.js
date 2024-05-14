const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new Schema({
  loc: String,
});

module.exports = mongoose.model("Location", locationSchema);
