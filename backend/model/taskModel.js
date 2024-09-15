const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskModel = new Schema({
  title: String,
  details: String,
  taskTypes: {
    type: String,
    enum: ["daily", "5s", "assign"],
  },
  taskStart: Date,
  taskEnd: Date,
  taskComplete: Date,
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
      assignStart: { type: Date, default: null },
      assignSubmit: { type: Date, default: null },
      assignAccept: { type: Date, default: null },
      assignedStatus: {
        type: String,
        enum: ["waiting", "ongoing", "submit", "done", "review"],
        default: "waiting",
      },
    },
  ],
  taskStatus: {
    type: String,
    enum: ["ongoing", "done", "delete"],
    default: "ongoing",
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
