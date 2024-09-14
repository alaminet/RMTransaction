const Task = require("../model/taskModel");

async function TaskNewChatController(req, res) {
  const { taskID, chatText, chatBy } = req.body;
  const chatDtls = [
    {
      chatTime: new Date(),
      chatText: chatText,
      chatBy: chatBy,
    },
  ];

  try {
    const newChat = await Task.findOneAndUpdate(
      { _id: taskID },
      {
        $push: { discussition: chatDtls },
      },
      { new: true }
    ).populate("discussition.chatBy", { userID: true, role: true });

    res.status(200).send({ newChat, massage: "comment Done" });
  } catch (error) {
    res.status(401).send(error);
  }
}
module.exports = TaskNewChatController;
