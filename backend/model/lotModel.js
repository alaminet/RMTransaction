const mongoose = require("mongoose");
const { Schema } = mongoose;

const lotSchema = new Schema({
  model: String,
  lot: String,
});

module.exports = mongoose.model("Lot", lotSchema);
