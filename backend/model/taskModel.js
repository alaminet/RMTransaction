const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskModel = new Schema({
  title: String,
  details: String,
  types: String,
  startDate: Date,
  endDate: Date,
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  assignedTo: [
    {
      assignedToID: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      assignedTime: Date,
      startTime: Date,
      submitTime: Date,
      endTime: Date,
      assignedStatus: {
        type: String,
        enum: ["waiting", "ongoing", "submit", "done", "review"],
        default: "waiting",
      },
    },
  ],
  taskStatus: {
    type: String,
    enum: ["waiting", "ongoing", "done", "review", "delete"],
    default: "waiting",
  },
  discussition: [
    {
      chatTime: Date,
      chatText: String,
      chatBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = mongoose.model("Task", taskModel);
