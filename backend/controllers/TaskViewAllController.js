const Task = require("../model/taskModel");

async function TaskViewAllController(req, res) {
  try {
    const allTask = await Task.find()
      .populate("assignedBy", { userID: true, role: true })
      .populate("assignedTo.assignedToID", { userID: true, role: true })
      .populate("discussition.chatBy", { userID: true, role: true });
    res.status(200).send({ allTask });
  } catch (error) {
    res.status(401).send(error);
  }
}
module.exports = TaskViewAllController;
