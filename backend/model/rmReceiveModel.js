const mongoose = require("mongoose");
const { Schema } = mongoose;

const RMReceiveSchema = new Schema({
  date: Date,
  LC: {
    type: String,
    default: null,
  },
  inv: {
    type: String,
    default: null,
  },
  BE: {
    type: String,
    default: null,
  },
  PO: {
    type: String,
    default: null,
  },
  rmk: {
    type: String,
    default: null,
  },
  tnxby: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  lotID: {
    type: Schema.Types.ObjectId,
    ref: "Lot",
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
