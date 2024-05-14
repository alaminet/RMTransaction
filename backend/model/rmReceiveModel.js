const mongoose = require("mongoose");
const { Schema } = mongoose;

const RMReceiveSchema = new Schema({
  date: Date,
  LC: String,
  inv: String,
  BE: String,
  PO: String,
  rmk: String,
  tnxby: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tnxID: Number,
  receList: [
    {
      codeID: {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
      locID: {
        type: Schema.Types.ObjectId,
        ref: "Location",
      },
      qty: Number,
      order: String,
      issue: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("RMReceive", RMReceiveSchema);
