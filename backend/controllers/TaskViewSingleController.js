const Task = require("../model/taskModel");

async function TaskViewSingleController(req, res) {
  const [taskID] = req.body;
  try {
    const allTask = await Task.findById(taskID)
      .populate("assignedBy", { userID: true, role: true })
      .populate("assignedTo.assignedToID", { userID: true, role: true })
      .populate("discussition.chatBy", { userID: true, role: true });
    res.status(200).send(allTask);
  } catch (error) {
    res.status(401).send(error);
  }
}
module.exports = TaskViewSingleController;
