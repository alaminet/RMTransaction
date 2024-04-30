const mongoose = require("mongoose");
const { Schema } = mongoose;

const RMIssueSchema = new Schema({
  date: String,
  station: String,
  model: String,
  lot: String,
  tnxby: String,
  tnxID: Number,
  issueList: [
    {
      code: String,
      qty: Number,
      loc: String,
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
