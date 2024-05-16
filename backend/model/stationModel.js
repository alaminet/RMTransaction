const mongoose = require("mongoose");
const { Schema } = mongoose;

const stationSchema = new Schema({
  station: String,
});

module.exports = mongoose.model("Station", stationSchema);
