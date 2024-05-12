const mongoose = require("mongoose");
const { Schema } = mongoose;

const bomSchema = new Schema({
  lotID: {
    type: Schema.Types.ObjectId,
    ref: "Lot",
  },
  itemlist: [
    {
      codeID: {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
      qty: Number,
    },
  ],
});

module.exports = mongoose.model("BOM", bomSchema);
