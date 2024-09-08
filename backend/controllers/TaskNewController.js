const Task = require("../model/taskModel");

async function TaskNewController(req, res) {
  const {
    title,
    details,
    taskTypes,
    taskStart,
    taskEnd,
    assignedBy,
    assignedTo,
  } = req.body;
 
  try {
    const newTask = await new Task({
      title: title,
      details: details,
      taskTypes: taskTypes,
      taskStart: taskStart,
      taskEnd: taskEnd,
      assignedBy: assignedBy,
      assignedTo: assignedTo,
    }).save();
    res.status(200).send({ newTask, massage: "New Task Added" });
  } catch (error) {
    res.status(401).send(error);
  }
}
module.exports = TaskNewController;
