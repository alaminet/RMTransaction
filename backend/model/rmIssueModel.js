const mongoose = require("mongoose");
const { Schema } = mongoose;

const RMIssueSchema = new Schema({
  date: Date,
  stationID: {
    type: Schema.Types.ObjectId,
    ref: "Station",
  },
  lotID: {
    type: Schema.Types.ObjectId,
    ref: "Lot",
  },
  tnxby: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tnxID: Number,
  issueList: [
    {
      lineID: {
        type: Schema.Types.ObjectId,
        ref: "RMReceive.receList",
      },
      codeID: {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
      qty: Number,
      rmk: String,
      status: {
        type: String,
        enum: ["waiting", "done", "reject"],
        default: "waiting",
      },
    },
  ],
});

module.exports = mongoose.model("RMIssue", RMIssueSchema);
