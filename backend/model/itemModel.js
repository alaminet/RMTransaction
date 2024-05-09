const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  code: String,
  itemname: String,
  uom: String,
});

module.exports = mongoose.model("Item", itemSchema);
